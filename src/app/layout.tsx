import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nikita Vologdins personal portfolio website.",
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
        {children}
      </body>
    </html>
  );
}
