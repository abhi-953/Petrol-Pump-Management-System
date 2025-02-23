import express from "express";
import {employeeFieldCntl,employeeFieldInputCntl,employeePost,employeeValueCntl,employeeDelete} from "../controller/employee.js";
const router=express.Router();

router.get("/fields",employeeFieldCntl);
router.get("/",employeeValueCntl);
router.get("/input",employeeFieldInputCntl);
router.post("/",employeePost);
router.post("/delete",employeeDelete);

export default router;