import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nikita Vologdins personal portfolio website.",
  icons: {},
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "900"],
  display: "swap",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body
        className={`${inter.className} h-full antialiased min-h-screen text-grey flex flex-col relative z-20`}
      >
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon-16x16.png"
        />
        {children}
      </body>
    </html>
  );
}
