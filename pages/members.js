import ProfilePage from "@/components/ProfilePage";
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
  // const { isReady } = router;
  // const { id } = router.query;
  // const { data: members, isLoading, error } = useSWR(`/api/members/${id}`);
  // if (!isReady || isLoading || error) return <h2>Loading...</h2>;

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
  async function deleteMember() {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const response = await fetch(`/api/members`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return;
      }

      if (response.ok) {
        await response.json();
      }

      router.push("/members");
    }
  }

  if (session) {
    return (
      <>
        <ProfilePage />
        <FormMember onSubmit={addMember} />
        <h2>Here are your members:</h2>
        <ul role="list">
          {members.map((member) => (
            <li key={member._id}>
              <Div className="card w-96 h-20 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-square btn-sm"
                      onClick={deleteMember}
                    >
                      🗑
                    </button>
                  </div>
                  <p>
                    {member.name} {member.avatar}
                  </p>
                  <p>
                    Number of assigned tasks:
                    {
                      data.filter(
                        (date) => date.memberName === `${member.name}`
                      ).length
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
