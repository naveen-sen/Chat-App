import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSidebar,getMessages,sendMessage } from "../Controller/message.controller.js";

const router = Router();

router.get("/user",protectRoute,getUserForSidebar)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)
export default router