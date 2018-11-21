export const Code = ({ children, syntax }) => (
  <pre className={syntax ? ` ${syntax}` : ''}>
    <code>{children}</code>
    <style jsx>
      {`
        pre {
          padding: 1.25rem;
          margin: 40px 0;
          border: 1px solid #d8d8d8;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }

        code {
          font-size: 14px;
          line-height: 20px;
        }
      `}
    </style>
  </pre>
);

export const InlineCode = ({ children, wrap = false }) => (
  <code className={wrap && 'wrap'}>
    {children}
    <style jsx>
      {`
        code {
          color: rgb(212, 0, 255);
          // color: #ca0e0e;
          font-size: 0.875em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }

        :global(h2) code,
        :global(h3) code,
        :global(h4) code,
        :global(h5) code {
          font-size: unset;
          color: inherit;
        }
      `}
    </style>
  </code>
);
