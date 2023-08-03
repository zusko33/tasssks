import Member from "../../../db/models/Member";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const members = await Member.find();
    return response.status(200).json(members);
  }

  if (request.method === "POST") {
    try {
      const memberData = request.body;
      const member = new Member(memberData);
      await member.save();
      return response.status(201).json({ status: "Member created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
