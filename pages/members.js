import ProfilePage from "@/components/ProfilePage";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const Div = styled.div`
  margin-bottom: 2%;
  justify-content: center;
`;

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function Members() {
  const { data: session } = useSession();
  const { data } = useSWR("/api/tasks", { fallbackData: [] });

  console.log(data);
  if (session) {
    return (
      <>
        <ProfilePage />
        <h2>Here are your members:</h2>
        <ul role="list">
          <li>
            <Div className="card w-96 h-20 bg-base-100 shadow-xl">
              <div className="card-body">
                <p>Zuza 🦄</p>
                <p>
                  Number of assigned tasks:
                  {data.filter((date) => date.memberName === "Zuza").length}
                </p>
              </div>
            </Div>
          </li>
          <li>
            <Div className="card w-96 h-20 bg-base-100 shadow-xl">
              <div className="card-body">
                <p>Pola 🐌</p>
                <p>
                  Number of assigned tasks:
                  {data.filter((date) => date.memberName === "Pola").length}
                </p>
              </div>
            </Div>
          </li>
          <li>
            <Div className="card w-96 h-20 bg-base-100 shadow-xl">
              <div className="card-body">
                <p>Maja 🐝</p>
                <p>
                  Number of assigned tasks:
                  {data.filter((date) => date.memberName === "Maja").length}
                </p>
              </div>
            </Div>
          </li>
          <li>
            <Div className="card w-96 h-20 bg-base-100 shadow-xl">
              <div className="card-body">
                <p>Pawel 🦥</p>
                <p>
                  Number of assigned tasks:
                  {data.filter((date) => date.memberName === "Pawel").length}
                </p>
              </div>
            </Div>
          </li>
        </ul>
        <Link href="/" passHref legacyBehavior>
          <Link>
            <Button className="btn btn-neutral"> 🔙 </Button>
          </Link>
        </Link>
      </>
    );
  }
}
