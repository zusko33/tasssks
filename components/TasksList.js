import Link from "next/link";
import styled from "styled-components";
// import useSWR from "swr";

// const Button = styled.button`
//   position: relative;
//   background-color: white;
//   border-radius: 8px;
//   color: black;
// `;

const Div = styled.div`
  margin-bottom: 2%;
`;
const Button = styled.button`
  margin: 2% 2% 2% 5%;
`;

export default function ListOfTasks({ data }) {
  //   const { data } = useSWR("/api/tasks", { fallbackData: [] });
  //   console.log("data", data);
  return (
    <>
      <ul role="list">
        {data.map((task) => (
          <li key={task._id}>
            <Div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <Link
                      href={`/tasks/${task._id}/edit`}
                      passHref
                      legacyBehavior
                    >
                      ⚙️
                    </Link>
                  </button>
                  <button className="btn btn-square btn-sm">
                    <Link href={`/tasks/${task._id}`} passHref legacyBehavior>
                      🗑
                    </Link>
                  </button>
                </div>
                <p>
                  {task.name} {task.type}
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
