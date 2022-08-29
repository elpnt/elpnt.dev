import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const themeScript = `
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (mediaQuery.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
`;

export default function Document() {
  return (
    <Html lang="ja" className="h-full">
      <Head>
        <Script id="theme-switch" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <link
          rel="preload"
          href="/inter.css"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="h-full dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
