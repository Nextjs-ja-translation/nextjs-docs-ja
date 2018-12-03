import withPure from '../components/hoc/pure';

const Content = withPure(() => (
  <div>
    <h1>Next.js 公式ドキュメント日本語翻訳プロジェクト</h1>
    <p>
      <a
        href="https://nextjs.org/docs/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Next.js の公式ドキュメント
      </a>
      を日本語に翻訳するプロジェクトです。
    </p>
    <ul>
      <li>
        <a href="/docs">[docs] 日本語訳ドキュメント</a>
      </li>
      <li>
        <a href="/contribution">[contribution] 貢献者一覧</a>
      </li>
    </ul>
    <p>
      GitHub の翻訳プロジェクトは
      <a
        href="https://github.com/5t111111/nextjs-docs-ja"
        target="_blank"
        rel="noopener noreferrer"
      >
        こちら
      </a>
    </p>
  </div>
));

export default () => <Content />;
