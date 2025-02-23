import express from "express";
import {nozzleDelete, NozzleFieldCntl,NozzleFieldInputCntl,NozzlePost,NozzleValueCntl} from "../controller/nozzle.js";
const router=express.Router();

router.get("/fields",NozzleFieldCntl);
router.get("/",NozzleValueCntl);
router.get("/input",NozzleFieldInputCntl);
router.post("/",NozzlePost);
router.post("/delete",nozzleDelete);

export default router;