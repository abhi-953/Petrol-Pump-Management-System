import express from "express";
import {productDelete, productFieldCntl,productFieldInputCntl,productPost,productValueCntl} from "../controller/product.js";
const router=express.Router();

router.get("/fields",productFieldCntl);
router.get("/",productValueCntl);
router.get("/input",productFieldInputCntl);
router.post("/",productPost);
router.post("/delete",productDelete);

export default router;