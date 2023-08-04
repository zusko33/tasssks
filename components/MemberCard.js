export default function MemberCard({ data, onClick }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl" key={data._id}>
      <h1>{data.avatar}</h1>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <div className="card-actions justify-end">
          <button className="badge badge-outline" onClick={onClick}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
