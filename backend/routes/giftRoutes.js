import express from "express";
import {giftFieldCntl,giftFieldInputCntl,giftPost,giftValueCntl,giftDelete} from "../controller/gift.js";
const router=express.Router();

router.get("/fields",giftFieldCntl);
router.get("/",giftValueCntl);
router.get("/input",giftFieldInputCntl);
router.post("/",giftPost);
router.post("/delete",giftDelete);

export default router;