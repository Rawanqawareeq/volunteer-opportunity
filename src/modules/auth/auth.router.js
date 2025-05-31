import { Router } from "express";
import * as AuthController from "./auth.controller.js";
import { validation } from "../../middlewave/validation.js";
import { asyncHandler } from "../../utils/catcherror.js";
import * as authvalidation from "./auth.validation.js";
import { checkEmail } from "../../middlewave/checkEmail.js";
import fileUpload, { fileType } from "../../utils/multer.js";

const router = Router();
router.post('/signup',fileUpload(fileType.image).single('image'),validation(authvalidation.signupSchema),checkEmail,asyncHandler(AuthController.signup));
router.patch('/sendcode',validation(authvalidation.sendCodeSchema),asyncHandler(AuthController.SendCode));
router.patch('/forgetpassword',validation(authvalidation.forgetpassword),asyncHandler(AuthController.forgetpassword));
router.post('/signin',validation(authvalidation.signinSchema),asyncHandler(AuthController.sginin));
router.get('/comfirmEmail/:email',asyncHandler(AuthController.comfirmEmail));


export default router;