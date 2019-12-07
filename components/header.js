import React, { PureComponent } from "react";
import classNames from "classnames";
import { useAmp } from "next/amp";

export default function Header(props) {
  const {
    height,
    shadow,
    zIndex,
    background,
    defaultActive,
    dotBackground,
    children
  } = props;
  const isAmp = useAmp();

  const desktopHeight = height.desktop || Number(height) || 0;
  const mobileHeight = height.mobile || desktopHeight;
  const tabletHeight = height.tablet || desktopHeight;

  const desktopShadow =
    shadow.desktop || (typeof shadow === "boolean" ? shadow : false);
  const tabletShadow =
    shadow.tablet || (typeof shadow === "boolean" ? shadow : false);
  const mobileShadow =
    shadow.mobile || (typeof shadow === "boolean" ? shadow : false);

  return (
    <header>
      <div
        className={classNames("fixed-container active", {
          "show-logo": dotBackground
        })}
      >
        {children}
      </div>
      <style jsx>
        {`
          header {
            left: 0;
            width: 100%;
            height: ${desktopHeight}px;
            ${isAmp ? "" : "position: -webkit-sticky;"}
            position: sticky;
            top: ${defaultActive ? 0 : -desktopHeight}px;
            z-index: ${zIndex || 1000};
          }
          @media screen and (max-width: 960px) {
            header {
              height: ${tabletHeight}px;
              top: ${defaultActive ? 0 : -tabletHeight}px;
            }
          }
          @media screen and (max-width: 640px) {
            header {
              height: ${mobileHeight}px;
              top: ${defaultActive ? 0 : -mobileHeight}px;
            }
          }
          .fixed-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            left: 0;
            z-index: ${zIndex || 1000};
            transition: box-shadow 0.5s ease, background 0.2s ease;
            ${dotBackground
              ? `
              background-image: radial-gradient(circle, #D7D7D7, #D7D7D7 1px, #FFF 1px, #FFF);
              background-size: 28px 28px;
            `
              : "background: rgba(255, 255, 255, 0);"};
          }
          .active {
            background: ${background || "rgba(255, 255, 255, 0.98)"};
            box-shadow: ${desktopShadow
              ? "0px 6px 20px rgba(0, 0, 0, 0.06)"
              : "unset"};
            pointer-events: auto;
          }
          @media screen and (max-width: 960px) {
            .active {
              box-shadow: ${tabletShadow
                ? "0px 6px 20px rgba(0, 0, 0, 0.06)"
                : "unset"};
            }
          }
          @media screen and (max-width: 640px) {
            .active {
              box-shadow: ${mobileShadow
                ? "0px 6px 20px rgba(0, 0, 0, 0.06)"
                : "unset"};
            }
          }
        `}
      </style>
    </header>
  );
}
