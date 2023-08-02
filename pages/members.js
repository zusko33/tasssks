import Link from "next/link";
import styled from "styled-components";
import UserTasksList from "@/components/UserTasksList";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function Members() {
  return (
    <>
      {/* <UserTasksList /> */}
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
