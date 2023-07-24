import Task from "@/db/models/Task";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const task = await Task.findById(id);

    if (!task) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(task);
  }
  if (request.method === "PATCH") {
    const updateTask = request.body;
    await Task.findByIdAndUpdate(id, updateTask);

    if (updateTask) {
      return response
        .status(200)
        .json({ status: "Task successfully updated." });
    }
  }
  if (request.method === "DELETE") {
    const deleteTask = await Task.findByIdAndDelete(id);

    if (deleteTask) {
      return response.status(200).json({ status: "Task successfully delete" });
    }
  }
}
