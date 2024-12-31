import express from "express";
import urlRoute from "./routes/url.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = 6000;

app.use("/", urlRoute);

console.log("MONGO_URL:", process.env.MONGO_URL); // This should output the MongoDB connection string
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// mongodb+srv://shortly:YByLWUJtv1MqZsFf@cluster0.aiu2f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
