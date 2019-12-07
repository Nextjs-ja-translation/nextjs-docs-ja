import Head from "next/head";

import { withMediaQuery } from "./media-query";

function Page({ title, description, children }) {
  return (
    <div>
      <Head>
        <title>{title || "Next.js - The React Framework"}</title>
        <meta
          name="description"
          content={
            description || "Next.js is the React framework for production"
          }
        />
      </Head>
      <style jsx>
        {`
           {
            overflow-x: hidden;
          }
        `}
      </style>
      <style jsx global>
        {`
          html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            height: 100%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            position: relative;
            min-height: 100%;
            margin: 0;
            line-height: 1.65;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            font-size: 16px;
            font-weight: 400;
            min-width: 320px;
            direction: ltr;
            font-feature-settings: "kern";
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            scroll-behavior: smooth;
          }
          html,
          body {
            background-color: #fff;
            color: #111;
          }
          ::selection {
            background-color: #0070f3;
            color: #fff;
          }
          [role="grid"]:focus {
            outline: none;
          }
          svg {
            text-rendering: optimizeLegibility;
          }
          h1,
          h2,
          h3 {
            margin: 0;
          }
          a {
            color: #0074de;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          a:hover {
            color: #68b5fb;
          }
          code {
            font-size: 0.9em;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
              serif;
          }
          code:before,
          code:after {
            content: "\`";
          }
          pre code:before,
          pre code:after {
            content: none;
          }
          .demo-footer .note code {
            background: rgba(0, 0, 0, 0.2);
            padding: 0.2rem;
            margin: 0 0.1rem;
            border-radius: 2px;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
          .f-reset {
            font-size: 1rem;
          }
          .f0 {
            font-size: 1.802032470703125em;
          }
          .f1 {
            font-size: 1.601806640625em;
          }
          .f2 {
            font-size: 1.423828125em;
          }
          .f3 {
            font-size: 1.265625em;
          }
          .f4 {
            font-size: 1.125em;
          }
          .f5 {
            font-size: 0.8888888888888888em;
          }
          .f6 {
            font-size: 0.7901234567901234em;
          }
          .fw1 {
            font-weight: 100;
          }
          .fw2 {
            font-weight: 200;
          }
          .fw3 {
            font-weight: 300;
          }
          .fw4 {
            font-weight: 400;
          }
          .fw5 {
            font-weight: 500;
          }
          .fw6 {
            font-weight: 600;
          }
          .fw7 {
            font-weight: 700;
          }
          .fw8 {
            font-weight: 800;
          }
          .fw9 {
            font-weight: 900;
          }
          .subtitle {
            color: #717171;
          }
          .mute {
            color: #757575;
          }
          .tc {
            text-align: center;
          }
          .row {
            display: flex;
            align-items: center;
            margin: 0 -1.5rem;
          }
          .column {
            flex: 1;
            padding: 0 1.5rem;
          }
          .display-none {
            display: none;
          }
          .display-mobile {
            display: none;
          }
          .display-tablet {
            display: none;
          }
          @media screen and (max-width: 640px) {
            .display-mobile {
              display: unset;
            }
            .hide-mobile {
              display: none;
            }
          }
          @media screen and (max-width: 960px) {
            .display-tablet {
              display: unset;
            }
            .hide-tablet {
              display: none;
            }
          }
          a[role="button"] {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            user-select: none;
          }
          .no-tap-highlight,
          a {
            -webkit-touch-callout: none;
            -ms-touch-action: pan-y;
            touch-action: pan-y;
            -webkit-tap-highlight-color: transparent;
          }
          .no-tap-callout {
            -webkit-touch-callout: none;
          }
          .no-drag {
            user-drag: none;
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
          }
          .visually-hidden {
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            border: 0;
            overflow: hidden;
            position: absolute;
          }

          code[class*="language-"],
          pre[class*="language-"] {
            color: #000;
            direction: ltr;
            text-align: left;
            white-space: pre;
            word-spacing: normal;
            word-break: normal;
            font-size: 0.95em;
            line-height: 1.4em;
            tab-size: 4;
            hyphens: none;
          }
          .token.comment,
          .token.prolog,
          .token.doctype,
          .token.cdata {
            color: #999;
          }
          .token.namespace {
            opacity: 0.7;
          }
          .token.string,
          .token.attr-value {
            color: #028265;
          }
          .token.punctuation,
          .token.operator {
            color: #000;
          }
          .token.url,
          .token.symbol,
          .token.boolean,
          .token.variable,
          .token.constant {
            color: #36acaa;
          }
          .token.atrule,
          .language-autohotkey .token.selector,
          .language-json .token.boolean,
          code[class*="language-css"] {
            font-weight: 600;
          }
          .language-json .token.boolean {
            color: #0070f3;
          }
          .token.keyword {
            color: #ff0078;
            font-weight: bolder;
          }
          .token.function,
          .token.tag,
          .token.class-name,
          .token.number,
          .token.tag .token.punctuation {
            color: #0070f3;
          }
          .language-autohotkey .token.tag {
            color: #9a050f;
          }
          .token.selector,
          .language-autohotkey .token.keyword {
            color: #00009f;
          }
          .token.important,
          .token.bold {
            font-weight: bold;
          }
          .token.italic {
            font-style: italic;
          }
          .token.deleted {
            color: red;
            font-weight: bolder;
          }
          .token.inserted {
            color: #0070f3;
            font-weight: bolder;
          }
          .language-json .token.property,
          .language-markdown .token.title {
            color: #000;
            font-weight: bolder;
          }
          .language-markdown .token.code {
            color: #0070f3;
            font-weight: normal;
          }
          .language-markdown .token.list,
          .language-markdown .token.hr {
            color: #999;
          }
          .language-markdown .token.url {
            color: #ff0078;
            font-weight: bolder;
          }
          .token.selector {
            color: #2b91af;
          }
          .token.property,
          .token.entity {
            color: #ff0000;
          }
          .token.attr-name,
          .token.regex {
            color: #d9931e;
          }
          .token.directive.tag .tag {
            background: #ffff00;
            color: #393a34;
          }

          svg {
            shape-rendering: crispEdges;
          }

          svg path,
          svg circle {
            shape-rendering: geometricprecision;
          }
          [data-reach-skip-link] {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            overflow: hidden;
            position: absolute;
          }
          [data-reach-skip-link]:focus {
            padding: 1rem;
            position: fixed;
            top: 10px;
            left: 10px;
            background: white;
            z-index: 1;
            width: auto;
            height: auto;
            clip: auto;
          }
        `}
      </style>
      {children}
    </div>
  );
}

export default withMediaQuery(Page);
