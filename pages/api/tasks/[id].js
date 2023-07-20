import dbConnect from "../../../db/connect";
import Image from "../../../db/models/Image";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const image = await Image.findById(id);

    if (!image) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(image);
  }
}
