import styled from "styled-components";

// const Button = styled.button`
//   position: relative;
//   background-color: white;
//   border-radius: 8px;
//   color: black;
// `;

export default function Form({ onSubmit }) {
  // if there will be default date add a prop to Form component
  return (
    <form onSubmit={onSubmit} className="form-control w-full max-w-xs">
      <label htmlFor="name" className="label">
        <span className="label-text">Title: </span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength="20"
        // defaultValue={defaultValue?.name}
      />
      <label htmlFor="type" className="label">
        <span className="label-text">choose type of task:</span>
      </label>
      <select name="type" id="type">
        <option value="🧽 🪣 ">🧽 🪣 </option>

        <option value="🗂 📌 ">🗂 📌 </option>
        <option value="🩺 💉">🩺 💉</option>
      </select>
      <label htmlFor="description" className="label">
        <span className="label-text">description:</span>
      </label>
      <textarea
        id="description"
        name="description"
        cols="30"
        rows="10"
        // defaultValue={defaultValue?.description}
      ></textarea>
      <button className="btn btn-neutral">
        {/* {defaultValue ? "Update this task" : "Add this task"} */}
        Add this task
      </button>
    </form>
  );
}
