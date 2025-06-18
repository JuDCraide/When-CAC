import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5634805215700413"
          crossOrigin="anonymous"
        ></script>
        <meta name="google-site-verification" content="6kHUAazUt1pl7AUX9JclAoOyeaBG38xERPzOh9EcpNA" />
      </Head>
      <GoogleAnalytics gaId="G-8Z11YZCEQV" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </>
  );
}
