import Joi from "joi";
export const createOrganizationSchema =Joi.object({
    id: Joi.string().hex().length(24),
    name: Joi.string().min(3).required(),
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
    email:Joi.string().email().required(),
    status:Joi.string().valid('Active','NotActive').optional(),
});
export const getOrganizationSchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
});
export const updateOrganizationSchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).optional(),
    status:Joi.string().valid('Active','NotActive').optional(),
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
    email:Joi.string().email().optional(), 
});
export const deleteOrganizationSchema =Joi.object({
    id: Joi.string().hex().length(24).required(),
});
