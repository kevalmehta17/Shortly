import { nanoid } from "nanoid";
import { URL } from "../models/url.js";
import validator from "validator";

// Function to validate URL format
function isValidUrl(url) {
  return validator.isURL(url, { require_protocol: true });
}
async function handleGenerateUrl(req, res) {
  const body = req.body;

  // Check if url is provided
  if (!body || !body.url) {
    return res.status(400).json({ message: "URL is required" });
  }

  // Validate the URL format
  if (!isValidUrl(body.url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  const shortId = nanoid(8);

  try {
    // Create a new URL record in the database
    await URL.create({
      shortId,
      redirectUrl: body.url, // Use 'url' key here
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (error) {
    console.error("Error creating URL:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { handleGenerateUrl };
