import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Task from "@/components/Task";
import styled from "styled-components";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/tasks/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deleteTask() {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
      }

      if (response.ok) {
        await response.json();
      }

      router.push("/calendar");
    }
  }

  return (
    <>
      <Link href="/calendar" passHref legacyBehavior>
        <Button className="btn btn-neutral"> 🔙 </Button>
      </Link>
      <Task data={data} onClick={deleteTask} />
    </>
  );
}
