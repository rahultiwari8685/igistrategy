// app/layout.js
import "./globals.css";
import Script from "next/script";
export const metadata = {
  title: "IGI Strategy",
  description: "IGI Strategy Platform is show the Mirror of the Politicians.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/flat-icons@1.0.0/flaticon.css"
        />
      </head>
      <body>
        {children}

        {/* jQuery */}
        <Script
          src="/assets/js/jquery-3.3.1.min.js"
          strategy="beforeInteractive"
        />

        {/* Popper */}
        <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />

        {/* Bootstrap JS */}
        <Script
          src="/assets/js/bootstrap.min.js"
          strategy="beforeInteractive"
        />

        {/* WOW animation */}
        <Script src="/assets/js/wow.min.js" />

        {/* Template custom script */}
        <Script src="/assets/js/theme.js" />
      </body>
    </html>
  );
}
