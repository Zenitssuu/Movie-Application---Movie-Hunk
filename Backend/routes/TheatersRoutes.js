import express, {Router} from "express"
import {addtheater,gettheaters} from "../controllers/TheatersController.js"
const router = Router();

router.post("/AddTheater",addtheater)
router.get("/getTheater",gettheaters)
export default router;