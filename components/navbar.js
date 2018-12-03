import Link from 'next/link';
import { withRouter } from 'next/router';
import classNames from 'classnames';

import { MediaQueryConsumer } from './media-query';
import NextLogo from './logo';
import Container from './container';

import GitHubLogo from './icons/github';

export default withRouter(({ isMobile, router }) => {
  const { route } = router;

  return (
    <MediaQueryConsumer>
      {media => {
        if (media.isMobile) {
          return (
            <Container center>
              <h1 className="visually-hidden" aria-hidden="true">
                Next.js
              </h1>
              <nav className="expand f5">
                <style jsx>
                  {`
                    nav {
                      position: relative;
                      flex: 1;
                      height: 96px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      flex-wrap: wrap;
                    }
                    nav .links {
                      display: flex;
                      align-items: center;
                      z-index: 1;
                    }
                    nav .dropdown {
                      flex: 1 0 100%;
                      display: flex;
                      margin: 0 -5px;
                      text-align: left;
                      // justify-content: flex-end;
                      // justify-content: space-between;
                      justify-content: space-around;
                    }
                    nav .links a {
                      display: inline-block;
                      // enlarge the clickable area
                      padding: 5px 8px;
                      color: inherit;
                      text-decoration: none;
                    }
                    nav .links a.active {
                      color: #0076ff;
                    }
                    nav .links a.selected {
                      color: #0076ff;
                      font-weight: 600;
                    }
                    nav .logo {
                      font-size: 0;
                      text-align: center;
                      overflow: hidden;
                    }
                    nav .logo a {
                      display: inline-block;
                      padding-right: 4px;
                    }
                    nav .links .icons {
                      display: flex;
                      position: relative;
                      align-items: center;
                    }
                    nav .links .icons a {
                      position: relative;
                      padding: 5px;
                      line-height: 1;
                      margin-right: 1rem;
                    }
                    nav .links .icons a .badge {
                      position: absolute;
                      display: inline-block;
                      right: 0px;
                      bottom: 4px;
                      width: 8px;
                      height: 8px;
                      border-radius: 4px;
                      background-color: #2bdb66;
                      pointer-events: none;
                    }
                    nav .links .icons a.no-margin {
                      margin-right: 0;
                    }
                  `}
                </style>
                <div className="logo">
                  <Link href="/">
                    <a aria-label="Next.js">
                      <NextLogo />
                    </a>
                  </Link>
                </div>
                <div className="links">
                  <div className="icons">
                    <Link href="https://github.com/5t111111/nextjs-docs-ja">
                      <a
                        aria-label="Next.js on GitHub"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <GitHubLogo />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="links mute dropdown">
                  <Link href="/docs">
                    <a
                      className={classNames({
                        selected: route.startsWith('/docs')
                      })}
                      title="Documentation"
                      role="button"
                    >
                      Docs
                    </a>
                  </Link>
                  <Link href="/contribution">
                    <a
                      className={classNames({
                        selected: route.startsWith('/contribution')
                      })}
                      title="Contribution"
                      role="button"
                    >
                      Contribution
                    </a>
                  </Link>
                </div>
              </nav>
            </Container>
          );
        }

        return (
          <Container center>
            <h1 className="visually-hidden" aria-hidden="true">
              Next.js
            </h1>
            <nav className="f-reset">
              <style jsx>
                {`
                  nav {
                    position: relative;
                    flex: 1;
                    height: 64px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }
                  nav .links {
                    display: flex;
                    align-items: center;
                    z-index: 1;
                    pointer-events: auto;
                  }
                  nav .links a {
                    display: inline-block;
                    // enlarge the clickable area
                    padding: 5px;
                    margin-left: -5px;
                    margin-right: 2rem;
                    text-decoration: none;
                    transition: color 0.2s ease;
                  }
                  nav .links a:hover {
                    color: #111;
                  }
                  nav .links a.selected {
                    color: #0076ff;
                    font-weight: 600;
                  }
                  nav .logo {
                    position: absolute;
                    width: 100%;
                    font-size: 0;
                    text-align: center;
                    overflow: hidden;
                    transition: all 0.2s ease;
                    // visibility: hidden;
                    pointer-events: none;
                    transform: translate3d(0, 30%, 0);
                    opacity: 0;
                  }
                  :global(.active) nav .logo {
                    pointer-events: unset;
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                  }
                  nav .logo a {
                    display: inline-block;
                  }
                  nav .links .icons {
                    display: flex;
                    align-items: center;
                  }
                  nav .links .icons a {
                    position: relative;
                    line-height: 1;
                    margin-right: 1rem;
                  }
                  nav .links .icons a .badge {
                    position: absolute;
                    display: inline-block;
                    right: 0px;
                    bottom: 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 4px;
                    background-color: #2bdb66;
                    pointer-events: none;
                  }
                  nav .links .icons a.no-margin {
                    margin-right: 0;
                  }
                  // CSS only media query for mobile + SSR
                  @media screen and (max-width: 640px) {
                    .logo {
                      display: none;
                    }
                  }
                `}
              </style>
              <div className="links">
                <Link href="/docs">
                  <a
                    className={classNames('mute', {
                      selected: route.startsWith('/docs')
                    })}
                    title="Documentation"
                    role="button"
                  >
                    Docs
                  </a>
                </Link>
                <Link href="/contribution">
                  <a
                    className={classNames('mute', {
                      selected: route.startsWith('/contribution')
                    })}
                    title="Contribution"
                    role="button"
                  >
                    Contribution
                  </a>
                </Link>
              </div>
              <div className="logo">
                <Link href="/" prefetch>
                  <a aria-label="Next.js">
                    <NextLogo />
                  </a>
                </Link>
              </div>
              <div className="links">
                <div className="icons">
                  <Link href="https://github.com/5t111111/nextjs-docs-ja">
                    <a
                      aria-label="Next.js on GitHub"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <GitHubLogo />
                    </a>
                  </Link>
                </div>
              </div>
            </nav>
          </Container>
        );
      }}
    </MediaQueryConsumer>
  );
});
