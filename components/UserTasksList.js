import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Div = styled.div`
  margin-bottom: 2%;
  justify-content: center;
`;
const Button = styled.button`
  margin: 2% 2% 2% 5%;
`;

export default function UserTasksList() {
  const router = useRouter();
  const { isReady } = router;
  const { data: session } = useSession();
  const id = session?.user.id;

  const { data: user } = useSWR(id ? `/api/users/${id}` : null);
  if (!user || !isReady) {
    return <h3>Loading...</h3>;
  }
  if (session) {
    return (
      <>
        <ul role="list">
          {user.map((task) => (
            <li key={task._id}>
              <Div className="card w-96 h-20 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm">
                      <Link
                        href={`/users/${task._id}/edit`}
                        passHref
                        legacyBehavior
                      >
                        ⚙️
                      </Link>
                    </button>
                    <button className="btn btn-square btn-sm">
                      <Link href={`/users/${task._id}`} passHref legacyBehavior>
                        🗑
                      </Link>
                    </button>
                    <button
                      //   onClick={() => onClick(task._id)}
                      className={
                        task.isDone
                          ? "btn btn-square btn-sm btn-active btn-secondary"
                          : "btn btn-square btn-sm"
                      }
                    >
                      ☑️
                    </button>
                  </div>
                  <p>
                    {task.name} {task.type} <br />
                    {task.date}
                  </p>
                </div>
              </Div>
            </li>
          ))}
        </ul>
        <Link href="/add" passHref legacyBehavior>
          <Link>
            <Button className="btn btn-neutral"> ➕ new task</Button>
          </Link>
        </Link>
      </>
    );
  }
}
