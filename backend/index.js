import express from "express";
import urlRoute from "./routes/url.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { URL } from "./models/url.js";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 9000;

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visiteHistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error during URL redirection:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

console.log("MONGO_URL:", process.env.MONGO_URL); // This should output the MongoDB connection string

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// mongodb+srv://shortly:YByLWUJtv1MqZsFf@cluster0.aiu2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
