export default function Task({ data, onClick }) {
  console.log("task", data);
  return (
    <div className="card w-96 bg-base-100 shadow-xl" key={data._id}>
      <h1>{data.type}</h1>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <button className="badge badge-outline" onClick={onClick}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
