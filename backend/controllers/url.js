import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

async function handleGenerateUrl(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ message: "URL is required" });
  const shortId = nanoid(8);
  await URL.create({ shortId, redirectUrl: body, visiteHistory: [] });

  return res.status(201).json({ id: shortId }); //201: Created
}

export { handleGenerateUrl };
