import { nanoid } from "nanoid";
import { URL } from "../models/url.js";

// Function to validate URL format
function isValidUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/; // Simple regex to validate URL format
  return regex.test(url);
}

async function handleGenerateUrl(req, res) {
  const body = req.body;

  // Check if redirectUrl is provided in the body
  if (!body || !body.redirectUrl) {
    return res.status(400).json({ message: "URL is required" });
  }

  // Validate the URL format
  if (!isValidUrl(body.redirectUrl)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  // Generate a unique short ID for the URL
  const shortId = nanoid(8);

  try {
    // Create a new URL record in the database
    await URL.create({
      shortId,
      redirectUrl: body.redirectUrl, // Save the valid redirect URL
      visiteHistory: [], // Empty visit history initially
    });

    // Respond with the created short ID
    return res.status(201).json({ id: shortId });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { handleGenerateUrl };
