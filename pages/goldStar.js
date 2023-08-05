import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function goldStar() {
  return (
    <>
      <h1>Awards for done tasssks:</h1>
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
