import Link from "next/link";

export default function Task({ data, onClick }) {
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
          <Link href={`/tasks/${data._id}/edit`} passHref legacyBehavior>
            <button className="badge badge-outline"> edit </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
