import React, { PureComponent } from "react";

const {
  Provider: MediaQueryProvider,
  Consumer: MediaQueryConsumer
} = React.createContext({
  isMobile: false,
  isTablet: false
});

const withMediaQuery = Comp =>
  class extends PureComponent {
    state = {
      isMobile: false,
      isTablet: false
    };
    componentDidMount() {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }
    onResize = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 960;

      if (isMobile !== this.state.isMobile) {
        this.setState({ isMobile });
      }
      if (isTablet !== this.state.isTablet) {
        this.setState({ isTablet });
      }
    };
    render() {
      const { isMobile, isTablet } = this.state;

      return (
        <MediaQueryProvider value={{ isMobile, isTablet }}>
          <Comp isMobile={isMobile} isTablet={isTablet} {...this.props} />
        </MediaQueryProvider>
      );
    }
  };

export { MediaQueryProvider, MediaQueryConsumer, withMediaQuery };
