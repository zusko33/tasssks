import styled from "styled-components";
import { Amaranth } from "next/font/google";

const amaranth = Amaranth({ weight: "700", subsets: ["latin"] });

const Headline = styled.h1`
  position: relative;
  top: 1%;
  width: 100%;
  margin: 0;
  padding: 10%;
  text-align: center;
  z-index: 1;
  font-size: 25px;
`;

export default function TitleBar() {
  return <Headline className={amaranth.className}>Tasssks</Headline>;
}
