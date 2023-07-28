import useSWR from "swr";
// import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import TasksList from "@/components/TasksList";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function Done() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });
  const updateData = data.filter((item) => item.isDone === true);

  return (
    <>
      <TasksList data={updateData} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
