import express from "express";
import {inspectionFieldCntl,inspectionFieldInputCntl,inspectionPost,inspectionValueCntl,inspectionDelete} from "../controller/inspection.js";
const router=express.Router();

router.get("/fields",inspectionFieldCntl);
router.get("/",inspectionValueCntl);
router.get("/input",inspectionFieldInputCntl);
router.post("/",inspectionPost);
router.post("/delete",inspectionDelete);

export default router;