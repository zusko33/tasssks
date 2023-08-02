export default function Form({ onSubmit, title, defaultValue }) {
  return (
    <form onSubmit={onSubmit} className="form-control w-full max-w-xs">
      <h2>{title}</h2>
      <label htmlFor="name" className="label">
        <span className="label-text">Title: </span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength="15"
        className="input input-bordered w-full max-w-xs"
        defaultValue={defaultValue?.name}
      />
      <label htmlFor="date" className="label">
        <span className="label-text">choose date:</span>
      </label>
      <input
        id="date"
        name="date"
        type="date"
        className="input input-bordered w-full max-w-xs"
        defaultValue={defaultValue?.date}
      />
      <label htmlFor="type" className="label">
        <span className="label-text">choose type of task:</span>
      </label>
      <select
        name="type"
        id="type"
        className="select select-bordered w-full max-w-xs"
      >
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
        rows="6"
        className="textarea textarea-bordered"
        defaultValue={defaultValue?.description}
      ></textarea>
      <label htmlFor="memberName" className="label">
        <span className="label-text">Member name: </span>
      </label>
      <input
        id="memberName"
        name="memberName"
        type="text"
        maxLength="11"
        className="input input-bordered w-full max-w-xs"
        defaultValue={defaultValue?.memberName}
      />
      <label htmlFor="avatar" className="label">
        <span className="label-text">choose an avatar:</span>
      </label>
      <select
        name="avatar"
        id="avatar"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="🦄 ">🦄 </option>

        <option value="🐝 ">🐝 </option>
        <option value="🐌 ">🐌 </option>
        <option value="🦥 ">🦥 </option>
      </select>
      <button className="btn btn-neutral">
        {defaultValue ? "Update this task" : "Add this task"}
      </button>
    </form>
  );
}
