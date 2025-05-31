import Joi from "joi";

export const updateSchema = Joi.object({
    firstName:Joi.string().min(3).max(20).optional(),
    lastName:Joi.string().min(3).max(20).optional(),
    image:Joi.object({
      fieldname: Joi.string().optional(),
      originalname: Joi.string().optional(),
      encoding: Joi.string().optional(),
      mimetype: Joi.string().optional(),
      destination: Joi.string().optional(),
      filename: Joi.string().optional(),
      path: Joi.string().optional(),
      size: Joi.number().optional(),
  }).optional(),
    phone:Joi.string().length(10).optional(),
   email:Joi.string().email().optional(),
   dateofBirth:Joi.date().optional(),
   address:Joi.string().min(5).max(20).optional(),
   city:Joi.string().min(5).max(20).optional(),
   password:Joi.string().optional(),
   confirmPassword:Joi.string().valid(Joi.ref('password')).optional(),
   gender:Joi.string().valid('male','female').optional(),
});
export const updateAdminSchema = Joi.object({
      id: Joi.string().hex().length(24),
    status:Joi.string().valid('Active','Block').optional(),
    role:Joi.string().valid('User','Admin','Volunteer').optional(),
});