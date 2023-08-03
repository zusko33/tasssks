export default function FormMember({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="form-control w-full max-w-xs">
      <h2>Add your members:</h2>
      <label htmlFor="name" className="label">
        <span className="label-text">Name: </span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength="10"
        className="input input-bordered w-full max-w-xs"
      />
      <label htmlFor="avatar" className="label">
        <span className="label-text">choose an avatar:</span>
      </label>
      <select
        name="avatar"
        id="avatar"
        className="select select-bordered w-full max-w-xs"
      >
        <option value="🦄">🦄</option>

        <option value="🐝">🐝</option>
        <option value="🐌">🐌</option>
        <option value="🦥">🦥</option>
        <option value="🦜">🦜</option>
        <option value="🦒">🦒</option>
      </select>
      <button className="btn btn-neutral" type="submit">
        Submit
      </button>
    </form>
  );
}
