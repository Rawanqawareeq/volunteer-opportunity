import Joi from "joi";

export const createactivitySchema =Joi.object({
    id: Joi.string().hex().length(24),
    organizationName:Joi.string().min(3).max(20).required(),
    name: Joi.string().min(3).max(20).required(),
    image:Joi.object({
      "fieldname": Joi.string().required(),
      "originalname": Joi.string().required(),
      "encoding": Joi.string().required(),
      "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').required(),
      "destination":Joi.string().required(),
      "filename": Joi.string().required(),
      "path":Joi.string().required(),
      "size":Joi.number().required(),
       }).required(),
    numberOfPeople:Joi.number().min(1).optional(),
    startDate:Joi.date().min('now').required(),
    endDate:Joi.date().greater(Joi.ref('startDate')).required(),
    city:Joi.string().required(),
    address:Joi.string().required(),
    description:Joi.string().max(500).required(),
    status:Joi.string().valid('Active','NotActive').optional(),
});
export const changeStatusSchema  = Joi.object({
  id: Joi.string().hex().length(24),
  requestStatus:Joi.string().valid('accepted','rejected').required(),
  note:Joi.string().max(500).optional(),
  status:Joi.string().valid('Active','NotActive').optional(),
});
export const updateActivitySchema =Joi.object({
    id: Joi.string().hex().length(24),
    organizationName:Joi.string().min(3).max(20).optional(),
    name: Joi.string().min(3).max(20).optional(),
    image:Joi.object({
      "fieldname": Joi.string().optional(),
      "originalname": Joi.string().optional(),
      "encoding": Joi.string().optional(),
      "mimetype": Joi.string().valid('image/png','image/jpeg','image/webp').optional(),
      "destination":Joi.string().optional(),
      "filename": Joi.string().optional(),
      "path":Joi.string().optional(),
      "size":Joi.number().optional(),
       }).optional(),
    numberOfPeople:Joi.number().min(1).optional(),
    startDate:Joi.date().min('now').optional(),
    endDate:Joi.date().greater(Joi.ref('startDate')).optional(),
    city:Joi.string().optional(),
    address:Joi.string().optional(),
    description:Joi.string().max(500).optional(),
    status:Joi.string().valid('Active','NotActive').optional(),
});
export const deleteActivitySchema =Joi.object({
    id: Joi.string().hex().length(24),
});
