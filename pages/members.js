import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormMember from "@/components/FormMember";
import { useRouter } from "next/router";

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
  const { mutate } = useSWR("/api/members");
  const { data: members } = useSWR("/api/members", { fallbackData: [] });
  const router = useRouter();

  async function addMember(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const membersData = Object.fromEntries(formData);

    const response = await fetch("/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membersData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();
    event.target.reset();
    router.push("/members");
  }

  if (session) {
    return (
      <>
        <h1>Hi {session.user.name}</h1>
        <FormMember onSubmit={addMember} />
        <br />
        <h2>Your members:</h2>
        <ul role="list">
          {members.map((member) => (
            <li key={member._id}>
              <Div className="card w-96 h-21 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm">
                      <Link
                        href={`/members/${member._id}`}
                        passHref
                        legacyBehavior
                      >
                        ✖️
                      </Link>
                    </button>
                  </div>
                  <p>
                    {member.name} {member.avatar}
                  </p>
                  <p>
                    tasks to do:
                    {
                      data
                        .filter((date) => date.memberName === `${member.name}`)
                        .filter((one) => one.isDone === false).length
                    }
                    <br /> done tasks:
                    {
                      data
                        .filter((date) => date.memberName === `${member.name}`)
                        .filter((one) => one.isDone === true).length
                    }
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
}
