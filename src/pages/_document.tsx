import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        {/* Font preloading is now handled by next/font in the App Router */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 