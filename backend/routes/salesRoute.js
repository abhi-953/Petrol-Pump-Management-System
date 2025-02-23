import express from "express";
import {salesDelete, salesFieldCntl,salesFieldInputCntl,salesPost,salesValueCntl} from "../controller/sales.js";
const router=express.Router();

router.get("/fields",salesFieldCntl);
router.get("/",salesValueCntl);
router.get("/input",salesFieldInputCntl);
router.post("/",salesPost);
router.post("/delete",salesDelete);

export default router;