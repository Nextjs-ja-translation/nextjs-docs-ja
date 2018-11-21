import { Component } from 'react';
import Router from 'next/router';
import { format, parse } from 'url';
import Head from './head';
import Sidebar from './sidebar';
import { H1, H2, H3, H4, H5 } from './text/headings';
import { Blockquote } from './text/quotes';
import { InlineCode, Code } from './text/code';
import { GenericLink } from './text/link';
import Heading from './heading';

import { MediaQueryConsumer } from '../media-query';

if (typeof window !== 'undefined') {
  require('intersection-observer');
}

function changeHash(hash) {
  const { pathname, query } = Router;

  const parsedUrl = parse(location.href);
  parsedUrl.hash = hash;

  Router.router.changeState(
    'replaceState',
    format({ pathname, query }),
    format(parsedUrl)
  );
}

export default class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: null
    };
    this.contentNode = null;
    this.observer = null;
    this.preventScrollObserverUpdate = false;

    this.updateSelected = this.updateSelected.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);

    const nodes = [...this.contentNode.querySelectorAll('h3 [id], h4 [id]')];
    const intersectingTargets = new Set();

    this.observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) {
          intersectingTargets.add(target);
        } else {
          intersectingTargets.delete(target);
        }
      }

      if (this.preventScrollObserverUpdate) {
        this.preventScrollObserverUpdate = false;
        return;
      }
      if (!intersectingTargets.size) return;

      let minIndex = Infinity;
      let id = '';

      for (let target of intersectingTargets.values()) {
        let index = nodes.indexOf(target);
        if (index < minIndex) {
          minIndex = index;
          id = target.id;
        }
      }

      const hash = '#' + (id || '');
      this.updateSelected(hash);
    });

    for (const node of nodes) {
      this.observer.observe(node);
    }

    const { hash } = window.location;
    this.setState({ currentSelection: hash });
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);

    this.observer.disconnect();
    this.observer = null;
  }

  updateSelected = hash => {
    if (this.state.currentSelection !== hash) {
      this.setState({
        currentSelection: hash
      });
    }
  };

  onHashChange() {
    this.preventScrollObserverUpdate = true;
    this.updateSelected(window.location.hash);
  }

  render() {
    const { headings } = this.props;

    return (
      <MediaQueryConsumer>
        {({ isMobile, isTablet }) => {
          return (
            <>
              <Head title="Getting Started" />

              <div className="documentation">
                <Sidebar
                  updateSelected={this.updateSelected}
                  currentSelection={this.state.currentSelection}
                  isMobile={isMobile}
                  headings={headings}
                />

                <div className="documentation__container">
                  <div
                    className="documentation__content"
                    ref={ref => (this.contentNode = ref)}
                  >
                    {this.props.children}
                  </div>
                </div>

                <style jsx>{`
                  .documentation {
                    display: ${isMobile ? 'block' : 'flex'};
                  }

                  .documentation__sidebar {
                    display: flex;
                    flex-direction: column;
                  }

                  .documentation__container {
                    flex: 1;
                    padding-bottom: 5rem;
                    overflow: hidden;
                  }

                  .documentation__header h1 {
                    margin-top: 0;
                  }

                  .documentation__content {
                    width: 100%;
                    max-width: 600px;
                  }

                  // CSS only media query for mobile + SSR
                  @media screen and (max-width: 640px) {
                    .documentation {
                      ${isMobile ? `` : `flex-direction: column;`};
                    }
                  }
                `}</style>
              </div>
            </>
          );
        }}
      </MediaQueryConsumer>
    );
  }
}

const DocH2 = ({ children, id }) => (
  <div>
    <Heading lean id={id}>
      <H2>{children}</H2>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
);

const DocH3 = ({ children, id }) => (
  <div>
    <Heading lean id={id}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      div {
        margin: 2rem 0 0 0;
      }
    `}</style>
  </div>
);

const DocH4 = ({ children, id }) => (
  <div>
    <Heading lean id={id}>
      <H4>{children}</H4>
    </Heading>
  </div>
);

const Details = ({ children }) => {
  return (
    <details>
      {children}
      <style jsx>{`
        margin: 1rem 0;
        padding: 0 0.5rem;
        background: #f9f9f9;
        overflow: hidden;
      `}</style>
    </details>
  );
};

const Summary = ({ children }) => {
  return (
    <summary>
      {children}
      <style jsx>{`
        summary {
          cursor: pointer;
          outline: none;
          font-weight: 500;
        }

        summary:hover {
          opacity: 0.8;
        }
      `}</style>
    </summary>
  );
};

export const components = {
  h1: H1,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  h5: H5,
  blockquote: Blockquote,
  code: Code,
  inlineCode: InlineCode,
  a: GenericLink,
  details: Details,
  summary: Summary
};
