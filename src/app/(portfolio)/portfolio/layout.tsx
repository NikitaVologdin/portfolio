import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Nav from "@/components/nav/Nav";
import Navbar from "@/components/nav/Navbar";
import MenuContextProvider from "@/context/portfolio/MenuContext";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nikita Vologdins personal portfolio website.",
};

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
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
    </>
  );
}
