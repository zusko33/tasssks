import { useSession, signIn, signOut } from "next-auth/react";

export default function LogIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Hi {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
