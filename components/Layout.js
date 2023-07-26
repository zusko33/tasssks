import TitleBar from "./TitleBar.js";
import styled from "styled-components";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ weight: "400", subsets: ["latin"] });

const Div = styled.div`
  margin-top: 2%;
  padding: 0;
`;
export default function Layout({ children }) {
  return (
    <>
      <Div className="artboard phone-5">
        <TitleBar />
        <main className={amaranth.className}>{children}</main>
      </Div>
    </>
  );
}
