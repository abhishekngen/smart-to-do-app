import {Router} from "express";
import {getTasksSummary} from "../controllers/ai.controllers";


const router = Router();

router.get('/summary', getTasksSummary);

export default router;

