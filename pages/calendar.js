import TasksList from "@/components/TasksList";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import Calendar from "react-calendar";
import React, { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
const Div = styled.div`
  margin: 0% 2% 2% 2%;
`;

export default function List() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });
  const [value, onChange] = useState(new Date());
  const [tasks, setDoneList] = useLocalStorageState("tasks", data);

  const handleDoneClick = (id) => {
    console.log("done click", id);
    setDoneList(
      tasks.map((task) =>
        task._id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
    console.log("tasks", tasks);
  };

  return (
    <>
      <Div>
        <Calendar onChange={onChange} value={value} />
      </Div>
      <TasksList data={tasks} onToggleDone={handleDoneClick} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
