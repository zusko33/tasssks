import User from "../../../db/models/User";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  }

  if (request.method === "POST") {
    try {
      const userData = request.body;
      const newUser = new User(userData);
      await newUser.save();
      return response.status(201).json({ status: "User created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
