import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default class extends PureComponent {
  state = {
    scrolled: false,
    fixed: false,
    active: false
  };

  onScroll = () => {
    const scroll = window.scrollY || document.body.scrollTop;
    const scrolled = scroll > (this.props.distance || 0);
    const fixed = scroll >= (this.props.distance || 0);
    const active = scroll >= (this.props.active || 0);

    if (
      scrolled !== this.state.scrolled ||
      fixed !== this.state.fixed ||
      active !== this.state.active
    ) {
      this.setState({ scrolled, fixed, active });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { scrolled, fixed, active } = this.state;
    const {
      height,
      offset,
      shadow,
      zIndex,
      distance,
      background,
      defaultActive,
      children
    } = this.props;

    return (
      <header>
        <div
          className={classNames('fixed-container', {
            scrolled,
            fixed,
            active: active || defaultActive
          })}
        >
          {children}
        </div>
        <style jsx>
          {`
            header {
              left: 0;
              top: 0;
              width: 100%;
              height: ${height}px;
            }
            .fixed-container {
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              left: 0;
              background: rgba(255, 255, 255, 0);
              z-index: ${zIndex || 1000};
              transition: box-shadow 0.5s ease, background 0.2s ease;
            }
            .fixed {
              position: fixed;
              top: ${offset || 0}px;
              pointer-events: none;
            }
            .scrolled {
              position: fixed;
              top: ${offset || 0}px;
            }
            .active {
              background: ${background || 'rgba(255, 255, 255, 0.98)'};
              ${shadow
                ? 'box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);'
                : ''} pointer-events: auto;
            }
          `}
        </style>
      </header>
    );
  }
}
