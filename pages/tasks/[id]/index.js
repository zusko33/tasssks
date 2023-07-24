import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import Task from "@/components/Task";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/tasks/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deleteTask() {
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

  return (
    <>
      <Link href={"/calendar"} passHref legacyBehavior>
        <Link justifySelf="start">back</Link>
      </Link>
      <Task data={data} onClick={deleteTask} />
    </>
  );
}
