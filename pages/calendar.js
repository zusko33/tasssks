import ListOfTasks from "@/components/TasksList";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function Calendar() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });

  return (
    <>
      <ListOfTasks data={data} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
