import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import styled from "styled-components";
import MemberCard from "@/components/MemberCard";

const Button = styled.button`
  margin: 2% 2% 2% 2%;
`;

export default function DetailMember() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: members, isLoading, error } = useSWR(`/api/members/${id}`);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  console.log(members);
  console.log(id);

  async function deleteMember() {
    const confirmation = window.confirm(
      "Are you sure you want to delete this member?"
    );
    if (confirmation) {
      const response = await fetch(`/api/members/${id}`, {
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
  return (
    <>
      <Link href="/members" passHref legacyBehavior>
        <Button className="btn btn-neutral">
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
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </Button>
      </Link>
      <MemberCard data={members} onClick={deleteMember} />
    </>
  );
}
