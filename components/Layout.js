import TitleBar from "./TitleBar.js";
// import styled from "styled-components";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ weight: "400", subsets: ["latin"] });

// const Div = styled.div`
//   margin-top: 2%;
//   padding: 0;
//   margin-bottom: 0%;
// `;
export default function Layout({ children }) {
  return (
    <>
      <div className="max-w-md md:h-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <TitleBar />
        <main className={amaranth.className}>{children}</main>
      </div>
    </>
  );
}

// className="artboard phone-5"
