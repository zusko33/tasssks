import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "@/components/Form";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
export default function AddNewTaskPage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/tasks");

  async function addTask(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    event.target.reset();
    router.push("/");
  }

  return (
    <>
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
      <h2>Add Tasssks</h2>

      <Form onSubmit={addTask} />
    </>
  );
}
