import { PureComponent, Component } from 'react';
import _scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import GithubSlugger from 'github-slugger';

import Header from '../header';
import Container from '../container';
import ArrowRight from '../icons/arrow-right';

function scrollIntoViewIfNeeded(elem) {
  const finalElement = findClosestScrollableElement(elem);
  return _scrollIntoViewIfNeeded(elem.parentElement, {
    behavior: 'smooth',
    scrollMode: 'if-needed',
    block: 'center',
    boundary: finalElement
  });
}

function findClosestScrollableElement(_elem) {
  const { parentNode } = _elem;
  if (!parentNode) return null;

  if (
    parentNode.scrollHeight > parentNode.clientHeight ||
    parentNode.scrollWidth > parentNode.clientWidth
  ) {
    return parentNode;
  } else {
    return findClosestScrollableElement(parentNode);
  }
}

function flattenHeadings(headings) {
  if (!Array.isArray(headings)) {
    return headings;
  }
  return [].concat(...headings.map(flattenHeadings));
}

function slugifyHeadings(headings) {
  const slugger = new GithubSlugger();

  return headings.map(heading => {
    heading.id = slugger.slug(heading.title);
    return heading;
  });
}

export class SidebarNavItem extends Component {
  constructor() {
    super();

    this.activeNavItem = null;
  }

  componentDidMount() {
    this.scrollIntoViewIfNeeded();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isActive !== nextProps.isActive;
  }

  componentDidUpdate() {
    this.scrollIntoViewIfNeeded();
  }

  scrollIntoViewIfNeeded() {
    if (this.activeNavItem && this.props.isActive) {
      if (this.activeNavItem.scrollIntoViewIfNeeded) {
        this.activeNavItem.scrollIntoViewIfNeeded();
      } else {
        scrollIntoViewIfNeeded(this.activeNavItem);
      }
    }
  }

  render() {
    const { item, updateSelected, isActive } = this.props;

    if (item.level === 2) {
      return (
        <li>
          <a
            href={'#' + item.id}
            onClick={updateSelected}
            className="documentation__sidebar-heading f5"
          >
            {item.title}
          </a>
          <style jsx>{`
            li {
              list-style: none;
            }
            .documentation__sidebar-heading {
              display: inline-block;
              margin-top: 1rem;
              margin-bottom: 4px;
              color: #999;
              text-transform: uppercase;
            }
            a:hover {
              color: gray;
            }
          `}</style>
        </li>
      );
    }

    let listStyle = '';
    switch (item.level) {
      case 3:
        listStyle = 'padding: 5px 3px 5px 0; font-size: 15px;';
        break;
      case 4:
        listStyle = 'padding: 3px 3px 3px 15px; font-size: 14px; color: #666;';
        break;
      case 5:
        listStyle = 'padding: 2px 3px 2px 30px; font-size: 13px; color: #666;';
        break;
      case 6:
        listStyle = 'padding: 2px 3px 2px 45px; font-size: 13px; color: #666;';
        break;
    }

    return (
      <li>
        <a
          href={'#' + item.id}
          onClick={updateSelected}
          className={`${isActive ? 'active' : ''} f-reset`}
          ref={ref => (this.activeNavItem = ref)}
        >
          {item.title}
        </a>
        <style jsx>{`
          li {
            list-style: none;
          }
          a {
            display: block;
            color: inherit;
            line-height: 1.4;
            margin: 0.4rem 0;
            ${listStyle};
          }
          a:hover {
            color: gray;
          }
          a.active {
            font-weight: 600;
            color: #0076ff;
          }
        `}</style>
      </li>
    );
  }
}

export class SidebarNavItemContainer extends Component {
  render() {
    const { headings, currentSelection, updateSelected, isMobile } = this.props;

    if (Array.isArray(headings)) {
      return (
        <ul>
          {headings.map((item, i) => (
            <SidebarNavItemContainer
              {...this.props}
              updateSelected={updateSelected}
              headings={item}
              key={i}
            />
          ))}
          <style jsx>{`
            ul {
              margin: 0 0 0.5rem 0;
              padding: 0;
            }
          `}</style>
        </ul>
      );
    }

    return (
      <SidebarNavItem
        item={headings}
        updateSelected={() => updateSelected('#' + headings.id)}
        isActive={currentSelection === '#' + headings.id}
        isMobile={isMobile}
      />
    );
  }
}

export default class Sidebar extends PureComponent {
  state = {
    dropdown: false
  };
  updateSelected = () => {
    this.setState({ dropdown: false });
  };
  toggleDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };
  render() {
    let { isMobile, headings, currentSelection } = this.props;
    const { dropdown } = this.state;

    let flatHeadings = slugifyHeadings(flattenHeadings(headings));

    if (isMobile) {
      const currentItem = flatHeadings.filter(
        item => currentSelection === '#' + item.id
      )[0];
      const currentTitle = currentItem ? currentItem.title : '';

      return (
        <>
          <div className="negative-spacer">
            <Header
              height={48}
              zIndex={999}
              offset={64 + 32}
              distance={1}
              defaultActive
              shadow
            >
              <div className="docs-select f5 fw6" onClick={this.toggleDropdown}>
                <Container>
                  <span
                    style={{
                      verticalAlign: 'middle',
                      marginRight: '0.2rem',
                      display: 'inline-block',
                      lineHeight: '1rem'
                    }}
                  >
                    <ArrowRight />
                  </span>
                  {currentTitle}
                </Container>
              </div>
              <div
                className={`documentation__sidebar docs-dropdown ${
                  dropdown ? '' : ' docs-closed'
                }`}
              >
                <Container>
                  <nav>
                    <SidebarNavItemContainer
                      headings={headings}
                      currentSelection={currentSelection}
                      updateSelected={this.updateSelected}
                    />
                  </nav>
                </Container>
              </div>
            </Header>
            <style jsx>{`
              .docs-select {
                height: 3rem;
                width: 100%;
                border-top: 1px solid #f5f5f5;
                line-height: 3rem;
                text-align: left;
                cursor: pointer;
              }
              .docs-select img {
                vertical-align: middle;
                margin-top: -2px;
              }
              .docs-dropdown {
                position: absolute;
                left: 0;
                right: 0;
                top: 100%;
                bottom: -50vh;
                background: white;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                transition: bottom 0.5s ease;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
              }
              .docs-dropdown.docs-closed {
                bottom: 100%;
              }
              .documentation__sidebar nav {
                padding-left: 28px;
              }
              .negative-spacer {
                margin: 0 -1rem;
              }
            `}</style>
          </div>
          <style jsx global>{`
            :global(.target.docs-anchor-target) {
              margin-top: -208px;
              padding-top: 208px;
            }
          `}</style>
        </>
      );
    }

    return (
      <div className="documentation__sidebar">
        <nav>
          <SidebarNavItemContainer
            headings={headings}
            currentSelection={currentSelection}
            updateSelected={this.updateSelected}
          />
        </nav>

        <style jsx>{`
          .documentation__sidebar {
            width: 312px;
            flex: 0 0 auto;
            position: relative;
            padding-right: 3rem;
          }
          .documentation__sidebar nav {
            position: fixed;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            display: flex;
            flex-direction: column;
            width: 18rem;
            padding: 2rem 1rem 0 0;
            height: calc(100vh - 64px);
          }
          // CSS only media query for mobile + SSR
          @media screen and (max-width: 640px) {
            .documentation__sidebar nav {
              position: unset;
              height: unset;
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}
