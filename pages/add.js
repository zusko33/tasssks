import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import LogIn from "@/components/LogIn";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
export default function AddNewTaskPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutate } = useSWR("/api/tasks");

  async function addTask(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const tasksData = Object.fromEntries(formData);

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasksData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    event.target.reset();
    router.push("/calendar");
  }
  if (session) {
    return (
      <>
        <Link href="/" passHref legacyBehavior>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>

        <Form onSubmit={addTask} title="ADD A NEW TASK:" />
      </>
    );
  }
  return (
    <>
      <h2>You need to be log in to add a new task</h2>
      <LogIn />
    </>
  );
}
