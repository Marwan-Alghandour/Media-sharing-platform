import { Request, Response } from "express";
import Media from "../model/Media";

export const uploadMedia = async (req: Request, res: Response) => {
  if (!req.files || !req.files.length) {
    return res.status(400).send({ error: "You must select a file." });
  }

  for (const file of req.files as Express.Multer.File[])
    await Media.create({
      type: file.mimetype,
      name: file.originalname,
      path: `${req.protocol + "://" + req.get("host")}/${file.path.replace(
        /\\/g,
        "/"
      )}`,
      liked: false,
    });

  res.status(201).send();
};

export const getMedia = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const limit: number = 3;

  try {
    if (page < 1) {
      return res.status(400).json({ error: "Invalid page or limit values" });
    }

    const media = await Media.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const mediaCount = await Media.count();

    res.status(200).send({
      count: mediaCount,
      nextPage: page + 1 > Math.ceil(mediaCount / limit) ? null : page + 1,
      results: media,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const likeMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { liked } = req.body;
    await Media.update({ liked }, { where: { id } });
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
