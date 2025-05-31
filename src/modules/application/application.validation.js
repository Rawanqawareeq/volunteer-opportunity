import Joi from "joi";

export const createApplicationSchema = Joi.object({
    activityId: Joi.string().length(24).hex().required(), 
  });
export const change_statusApplicationSchema = Joi.object({
    applicationId: Joi.string().length(24).hex(),
    status:Joi.string().valid('pending','accepted','rejected').required(),
    notes:Joi.string().optional(),
    rejectedReason:Joi.string().optional(),
  });