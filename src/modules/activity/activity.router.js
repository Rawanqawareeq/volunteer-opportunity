import { Router } from "express";
import fileUpload, { fileType } from "../../utils/multer.js";
import { auth } from "../../middlewave/auth.js";
import { asyncHandler } from "../../utils/catcherror.js";
import  * as schema from "./activity.validation.js";
import { endPoint } from "./activity.role.js";
import  * as activityController from "./activity.controller.js";
import { validation } from "../../middlewave/validation.js";

const router = Router();
router.post('/',fileUpload(fileType.image).single('image'),validation(schema.createactivitySchema),auth(endPoint.Create),asyncHandler(activityController.create));
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(schema.updateActivitySchema),auth(endPoint.update),asyncHandler(activityController.update));
router.patch('/changeStatus/:id',validation(schema.changeStatusSchema),auth(endPoint.changeStatus),asyncHandler(activityController.changeRequestStatus));
router.get('/getVolunteer',auth(endPoint.getVolunteer),asyncHandler(activityController.getVolunteer));
router.get('/getActive',asyncHandler(activityController.getActive));
router.get('/',auth(endPoint.getAll),asyncHandler(activityController.get));
router.get('/getDetails/:id',asyncHandler(activityController.getDetails));

router.delete('/:id',validation(schema.deleteActivitySchema),auth(endPoint.delete),asyncHandler(activityController.deleteActivity));


//router.get('/',auth(endpoint.get),asyncHandler(productcontroller.get));
export default router;
