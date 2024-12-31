import { Router } from "express";
import { handleGenerateUrl } from "../controllers/url.js";
const router = Router();

router.post("/", handleGenerateUrl);

export default router;
