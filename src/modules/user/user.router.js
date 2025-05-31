import { Router } from "express";
import { auth } from "../../middlewave/auth.js";
import { asyncHandler } from "../../utils/catcherror.js";
import * as userController from "./user.controller.js";
import { endPoints } from "./user.role.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import { validation } from "../../middlewave/validation.js";
import * as userVaildation from "./user.validation.js";

const router = Router();

router.get('/allUsers',auth(endPoints.getAllUsers),asyncHandler(userController.getAll));
router.get('/getUserData',auth(endPoints.getUserData),asyncHandler(userController.getDetails));
//router.get('/',auth(endPoints.getUsers),asyncHandler(userController.getusers));
router.patch('/',fileUpload(fileType.image).single('image'),validation(userVaildation.updateSchema),auth(endPoints.update),asyncHandler(userController.update));
router.patch('/update/:id',validation(userVaildation.updateAdminSchema),auth(endPoints.updateAdmin),asyncHandler(userController.updateUserbyAdmin));


export default router;