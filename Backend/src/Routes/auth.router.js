import {signup,signin,signout,updateProfile,checkForAuthentication} from "../Controller/auth.controller.js"
import Router from "express"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = Router()

router.get("/signup",signup)
router.post("/signup",signup)
router.get("/signin",signin)
router.post("/signin",signin)
router.post("/signout",signout)
router.put("/update-profile",protectRoute,updateProfile)
router.get("/check",protectRoute,checkForAuthentication)

export default router