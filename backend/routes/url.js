import { Router } from "express";
import { handleGenerateUrl } from "../controllers/url";

const router = Router();

router.post("/", handleGenerateUrl);

export default router;
