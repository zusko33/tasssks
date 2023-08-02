import User from "@/db/models/User";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const user = await User.findById(id).populate("tasks");

    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(user);
  }
  if (request.method === "PATCH") {
    const updateTaskByUser = request.body;
    await User.findByIdAndUpdate(id, updateTaskByUser);

    if (updateTaskByUser) {
      return response
        .status(200)
        .json({ status: "Task successfully updated." });
    }
  }
  if (request.method === "DELETE") {
    const deleteTaskByUser = await User.findByIdAndDelete(id);

    if (deleteTaskByUser) {
      return response.status(200).json({ status: "Task successfully delete" });
    }
  }
}
