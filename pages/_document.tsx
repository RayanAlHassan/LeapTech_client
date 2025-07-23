// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon / Logo */}
        <link rel="icon" href="/images/LeapLogo.jpeg" type="image/jpeg" />
        {/* Optional: Apple & OG tags */}
        <link rel="apple-touch-icon" href="/images/LeapLogo.jpeg" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/images/LeapLogo.jpeg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
