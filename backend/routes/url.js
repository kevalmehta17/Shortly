import { Router } from "express";
import { handleGenerateUrl, handleGetAnalytics } from "../controllers/url.js";
const router = Router();

router.post("/", handleGenerateUrl);

router.get("/analytics/:shortId ", handleGetAnalytics);

export default router;
