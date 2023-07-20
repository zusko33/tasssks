import styled from "styled-components";
import Home from "../components/Home";
import useSWR from "swr";
import Link from "next/link.js";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 85%;
  background-color: lights;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s, transform 0.3s;
  border: 1px solid #e0e0e0; /* Change the border color */
`;

const Button = styled.button`
  position: relative;
  background-color: white;
  border-radius: 8px;
  color: black;
`;

export default function HomePage() {
  const { data } = useSWR("/api/tasks", { fallbackData: [] });
  console.log(data);
  return (
    <>
      <List role="list">
        {data.map((image) => (
          <ListItem key={image._id}>
            <Home src={image.src} alt={image.alt} id={image._id} />
          </ListItem>
        ))}
      </List>
      <Link href="/add" passHref legacyBehavior>
        <Link>
          <Button> ➕ new task</Button>
        </Link>
      </Link>
    </>
  );
}
