import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import TasksList from "@/components/TasksList";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function Done() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR("/api/tasks", { fallbackData: [] });
  const { mutate } = useSWR("/api/tasks");
  const [tasks, setTasks] = useState(data);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function notDoneTask(taskId) {
    const updateTask = tasks.find((task) => task._id === taskId);
    updateTask.isDone = !updateTask.isDone;

    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updateTask : task))
    );
    mutate();
    router.push("/done");
  }
  const updateData = data.filter((item) => item.isDone === true);

  return (
    <>
      <TasksList data={updateData} onClick={notDoneTask} />
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
