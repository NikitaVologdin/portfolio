import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/nav/Nav";
import Navbar from "../components/nav/Navbar";
import Container from "../components/Container";
import ContextProvider from "../context/ContextProvider";
import { context } from "../context/ContextProvider";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nikita Vologdins personal portfolio website.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased min-h-screen text-grey flex flex-col relative`}
      >
        <ContextProvider value={context}>
          <Header>
            <Container>
              <Navbar>
                <Nav />
              </Navbar>
            </Container>
          </Header>
          <Main>{children}</Main>
        </ContextProvider>
      </body>
    </html>
  );
}
