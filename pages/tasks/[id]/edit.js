import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "@/components/Form";
import styled from "styled-components";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function EditPage() {
  const { mutate } = useSWR("/api/tasks");
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/tasks/${id}`);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function editTask(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData);

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    event.target.reset();
    router.push("/calendar");
  }

  return (
    <>
      <Link href="/calendar" passHref legacyBehavior>
        <Button className="btn btn-neutral"> 🔙 </Button>
      </Link>
      <h2>Edit Task:</h2>

      <Form onSubmit={editTask} defaultValue={data} />
    </>
  );
}
