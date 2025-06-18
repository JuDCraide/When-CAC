import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5634805215700413"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <GoogleAnalytics gaId="G-8Z11YZCEQV" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
