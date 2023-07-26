import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;
const Div = styled.div`
  margin-bottom: 2%;
  justify-content: center;
`;

export default function Done() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });

  return (
    <>
      <ul role="list">
        {data
          .filter((tasks) => tasks.isDone === true)
          .map((task) => (
            <li key={task._id}>
              <Div className="card w-96 h-20 bg-base-100 shadow-xl">
                <div className="card-body">
                  <p>
                    {task.name} {task.type} <br />
                    {task.date}
                  </p>
                </div>
              </Div>
            </li>
          ))}
      </ul>
      <Link href="/" passHref legacyBehavior>
        <Link>
          <Button className="btn btn-neutral"> 🔙 </Button>
        </Link>
      </Link>
    </>
  );
}
