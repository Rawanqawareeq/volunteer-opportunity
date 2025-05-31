import { Router } from "express";
import { validation } from "../../middlewave/validation.js";
import * as applicationController from "./application.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endPoint } from "./application.role.js";
import { asyncHandler } from "../../utils/catcherror.js";
import * as schema from "./application.validation.js";
const router = Router();
router.post('/',validation(schema.createApplicationSchema),auth(endPoint.Create),asyncHandler(applicationController.create));
router.get('/volunteerapplication/:activityId',auth(endPoint.getAll),asyncHandler(applicationController.getAllUserApplications));
router.get('/userApplications',auth(endPoint. getuser),asyncHandler(applicationController.getuserApplication));
router.patch('/:applicationId',auth(endPoint.getAll),validation(schema.change_statusApplicationSchema),asyncHandler(applicationController.change_status));

export default router;
