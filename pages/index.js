import styled from "styled-components";
import Home from "../components/Home";
import useSWR from "swr";
import Link from "next/link.js";
import LogIn from "../components/LogIn";

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-self: center;
  place-items: center;
  row-gap: 20%;
  column-gap: 0%;
  padding-bottom: 2rem;
  padding-top: 2rem;
  margin-top: 15%;
`;

export default function HomePage() {
  const { data } = useSWR("/api/images", { fallbackData: [] });

  return (
    <>
      <LogIn />
      <br />
      <List role="list" className="flex flex-col w-full border-opacity-50">
        {data.map((image) => (
          <li key={image._id}>
            <div
              className="tooltip tooltip-open tooltip-top"
              data-tip={`${image.details}`}
            >
              <Link href={`/${image.alt}`}>
                <Home src={image.src} alt={image.alt} id={image._id} />
              </Link>
            </div>
          </li>
        ))}
      </List>
    </>
  );
}
