import styled from "styled-components";

const Headline = styled.h1`
  position: relative;
  top: 1%;
  width: 100%;
  margin: 0;
  padding: 10%;
  text-align: center;
  z-index: 1;
`;

export default function TitleBar() {
  return <Headline>TASSSKS</Headline>;
}
