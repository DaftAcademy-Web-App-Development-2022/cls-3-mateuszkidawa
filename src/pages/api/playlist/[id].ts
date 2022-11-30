import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    const students = await getPlaylist(id as string);
    res.status(200).send({ data: students });
  } else if (req.method === "DELETE") {
    await deletePlaylist(id as string);
    res.status(200).send({});
  }
}

async function getPlaylist(id: string) {
  const result = await Playlist.findById(id);
  if (!result) return null;
  const student = result.toObject();
  return {
    name: student.name,
  };
}

async function deletePlaylist(id: string) {
  await Playlist.findByIdAndDelete(id);
}

export type Response = any;
