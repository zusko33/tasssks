import ListOfTasks from "@/components/TasksList";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
// import Task from "@/components/Task";
import Calendar from "react-calendar";
import React, { useState } from "react";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
const Div = styled.div`
  margin: 0% 2% 2% 2%;
`;

export default function List() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Div>
        <Calendar onChange={onChange} value={value} />
      </Div>
      <ListOfTasks data={data} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
