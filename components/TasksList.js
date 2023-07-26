import Link from "next/link";
import styled from "styled-components";

const Div = styled.div`
  margin-bottom: 2%;
  justify-content: center;
`;
const Button = styled.button`
  margin: 2% 2% 2% 5%;
`;

export default function ListOfTasks({ data, onClick }) {
  return (
    <>
      <ul role="list">
        {data.map((task) => (
          <li key={task._id}>
            <Div className="card w-96 h-20 bg-base-100 shadow-xl">
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
                  <button className="btn btn-square btn-sm" onClick={onClick}>
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
