import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

const Button = styled.button`
  position: relative;
  background-color: white;
  border-radius: 8px;
  color: black;
`;

export default function ListOfTasks() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });
  console.log("data", data);
  return (
    <>
      <ul role="list">
        {data.map((task) => (
          <li key={task._id}>
            <p>
              {task.name} {task.type}
            </p>

            <Button> Edit ⚙️</Button>
          </li>
        ))}
      </ul>
      <Link href="/add" passHref legacyBehavior>
        <Button>➕ Add task</Button>
      </Link>
    </>
  );
}
