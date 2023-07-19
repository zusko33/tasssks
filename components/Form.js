import styled from "styled-components";

const Button = styled.button`
  position: relative;
  background-color: white;
  border-radius: 8px;
  color: black;
`;

export default function Form({ onSubmit }) {
  // if there will be default date add a prop to Form component
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Title:</label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength="20"
        // defaultValue={defaultValue?.name}
      />
      <label htmlFor="type">choose type of task:</label>
      <select name="type" id="type">
        <option value="clean">🧽 🪣 </option>

        <option value="documents">🗂 📌 </option>
        <option value="doctor">🩺 💉</option>
      </select>
      <label htmlFor="description">description:</label>
      <textarea
        id="description"
        name="description"
        cols="30"
        rows="10"
        // defaultValue={defaultValue?.description}
      ></textarea>
      <Button type="submit">
        {/* {defaultValue ? "Update this task" : "Add this task"} */}
        Add this task
      </Button>
    </form>
  );
}
