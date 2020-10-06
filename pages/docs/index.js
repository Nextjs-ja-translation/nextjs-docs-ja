import Page from "../../components/page";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Container from "../../components/container";
import { MediaQueryConsumer } from "../../components/media-query";
import withPure from "../../components/hoc/pure";

import Markdown, { headings } from "../../components/docs/docs.mdx";
import Documentation, { components } from "../../components/docs/documentation";
import baseCommit from "../../base-commit.json";

const Content = withPure(() => <Markdown components={components} />);

const TranslationInformation = () => {
  const baseCommitUrl = `https://github.com/zeit/next-site/tree/${baseCommit.ref}`;

  return (
    <div>
      <p>
        このドキュメント日本語翻訳は、ドキュメント原文の登録されているリポジトリのコミット
        <b>
          <a href={baseCommitUrl} target="_blank" rel="noopener noreferrer">
            {baseCommit.ref}
          </a>
        </b>
        を元に翻訳されています。
      </p>
      <p>
        Next.js 9.3 以降本家ドキュメントが新しくなったため、リポジトリを新しく作り直しました。情報が古くなっている場合もありますので、できるだけ最新の情報を参照ください。<br />
        <b>
          ・<a
            href="https://github.com/Nextjs-ja-translation/Nextjs-ja-translation-docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            リポジトリ
          </a>
        </b>
        <br />
        <b>
          ・<a
            href="https://nextjs-ja-translation-docs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            翻訳ドキュメントのURL
          </a>
        </b>
      </p>
      <style jsx>{`
        div {
          background-color: #f7f7f7;
          padding: 1.25rem;
          margin: 40px 0;
          border: 1px solid #d8d8d8;
        }
      `}</style>
    </div>
  );
};

export default () => (
  <Page>
    <MediaQueryConsumer>
      {({ isMobile }) => (
        <Header
          height={64 + (isMobile ? 32 : 0)}
          shadow={!isMobile}
          defaultActive
        >
          <Navbar />
        </Header>
      )}
    </MediaQueryConsumer>
    <Container>
      <Documentation headings={headings}>
        <TranslationInformation />
        <Content />
      </Documentation>
    </Container>
  </Page>
);
