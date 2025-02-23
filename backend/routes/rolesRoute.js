import express from "express";
import {rolesDelete, rolesFieldCntl,rolesFieldInputCntl,rolesPost,rolesValueCntl} from "../controller/task.js";
const router=express.Router();

router.get("/fields",rolesFieldCntl);
router.get("/",rolesValueCntl);
router.get("/input",rolesFieldInputCntl);
router.post("/",rolesPost);
router.post("/delete",rolesDelete);

export default router;