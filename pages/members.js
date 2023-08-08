import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import FormMember from "@/components/FormMember";
import { useRouter } from "next/router";
import LogIn from "@/components/LogIn";

const Div = styled.div`
  margin-bottom: 2%;
  justify-content: center;
`;

const Button = styled.button`
  margin: 2% 2% 2% 2%;
  padding-bottom: 2%;
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
        <ul role="list" className="overflow-auto">
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
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
      </>
    );
  }
  return (
    <>
      <h2>You need to be log in to add a new member</h2>
      <LogIn />
    </>
  );
}
