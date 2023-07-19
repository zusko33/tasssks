import Image from "../../../db/models/Image";
import dbConnect from "../../../db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const images = await Image.find();
    return response.status(200).json(images);
  }

  //   if (request.method === "POST") {
  //     try {
  //       const imageData = request.body;
  //       const image = new Image(imageData);
  //       await image.save();
  //       return response.status(201).json({ status: "Image created." });
  //     } catch (error) {
  //       console.error(error);
  //       return response.status(400).json({ error: error.message });
  //     }
  //   }
}
