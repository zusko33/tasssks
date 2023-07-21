import Image from "../../../db/models/Image";
import Task from "@/db/models/Task";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const images = await Image.find();
    return response.status(200).json(images);
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;
      const task = new Task(taskData);
      await task.save();
      return response.status(201).json({ status: "Task created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
