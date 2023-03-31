import { NextApiRequest, NextApiResponse } from "next";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const items: {
      title: string;
      imagePath: string;
      uri: string;
      id: number;
    }[] = [];

    for (let i = 0; i < 20; i++) {
      const height = randomIntFromInterval(340, 600);

      items.push({
        title: `Item ${i + 1}`,
        imagePath: `http://via.placeholder.com/400x${height}`,
        uri: "2",
        id: i,
      });
    }

    res.status(200).json(items);
  }
}
