import { Router } from "express";
import fileUpload, { fileType } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/catcherror.js";
import  * as OrganizationController from "./organization.controller.js";
import { auth } from "../../middlewave/auth.js";
import { endPoint } from "./organization.role.js";
import { validation } from "../../middlewave/validation.js";
import * as schema from "./organization.validation.js";

const router = Router({caseSensitive:true});
router.post('/',fileUpload(fileType.image).single('image'),validation(schema.createOrganizationSchema),auth(endPoint.Create),asyncHandler(OrganizationController.createOrganization));
router.get('/ActiveOrganization',asyncHandler(OrganizationController.getActive));
router.get('/',auth(endPoint.getAll),asyncHandler(OrganizationController.getAll));
router.get('/:id',validation(schema.getOrganizationSchema),auth(endPoint.getDetails),asyncHandler(OrganizationController.getDetails));
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(schema.updateOrganizationSchema),auth(endPoint.update),asyncHandler(OrganizationController.update));
router.delete('/:id',validation(schema.deleteOrganizationSchema),auth(endPoint.delete),asyncHandler(OrganizationController.deleteOrganization));


export default router;
