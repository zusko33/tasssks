import ListOfTasks from "@/components/TasksList";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

const StyledBackLink = styled(Link)`
  justify-self: flex-start;
`;

export default function Calendar() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });

  return (
    <>
      <ListOfTasks data={data} />
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>⬅️</StyledBackLink>
      </Link>
    </>
  );
}
