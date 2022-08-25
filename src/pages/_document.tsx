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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Script id="theme-switch" strategy="beforeInteractive">
          {themeScript}
        </Script>
      </Head>
      <body className="h-full dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
