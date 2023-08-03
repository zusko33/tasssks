import Member from "@/db/models/Member";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const member = await Member.findById(id);

    if (!task) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(task);
  }
  if (request.method === "DELETE") {
    const deleteMember = await Member.findByIdAndDelete(id);

    if (deleteMember) {
      return response
        .status(200)
        .json({ status: "Member successfully delete" });
    }
  }
}
