import express from "express";
import {purchaseDelete, purchaseFieldCntl,purchaseFieldInputCntl,purchasePost,purchaseValueCntl} from "../controller/purchase.js";
const router=express.Router();

router.get("/fields",purchaseFieldCntl);
router.get("/",purchaseValueCntl);
router.get("/input",purchaseFieldInputCntl);
router.post("/",purchasePost);
router.post("/delete",purchaseDelete);

export default router;