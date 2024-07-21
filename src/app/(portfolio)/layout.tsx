import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Nav from "../../components/nav/Nav";
import Navbar from "../../components/nav/Navbar";
import Container from "../../components/Container";
import MenuContextProvider from "@/context/portfolio/MenuContext";
import { ReactElement, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nikita Vologdins personal portfolio website.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "900"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased min-h-screen text-grey flex flex-col relative z-20`}
      >
        <Header>
          <div className="container my-auto h-full mx-auto md:px-5 lg:px-24">
            <MenuContextProvider>
              <Navbar>
                <Nav />
              </Navbar>
            </MenuContextProvider>
          </div>
        </Header>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
