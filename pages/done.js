import useSWR from "swr";
// import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import TasksList from "@/components/TasksList";
import { AiOutlineRollback } from "react-icons/ai";
import { IconContext } from "react-icons";

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
          <Button className="btn btn-neutral">
            <IconContext.Provider value={{ size: "2rem" }}>
              <AiOutlineRollback />
            </IconContext.Provider>
          </Button>
        </Link>
      </Link>
    </>
  );
}
