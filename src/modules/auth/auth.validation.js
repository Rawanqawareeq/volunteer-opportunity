import Joi from "joi";
export const signupSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  image: Joi.object({
    fieldname: Joi.string().optional(),
    originalname: Joi.string().optional(),
    encoding: Joi.string().optional(),
    mimetype: Joi.string().optional(),
    destination: Joi.string().optional(),
    filename: Joi.string().optional(),
    path: Joi.string().optional(),
    size: Joi.number().optional(),
  }).optional(),
  phone: Joi.string().length(10).required(),
  email: Joi.string().email().required(),
  dateofBirth: Joi.date().required(),
  address: Joi.string().min(5).max(20).required(),
  city: Joi.string().min(5).max(20).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  gender: Joi.string().valid("male", "female").required(),
  role: Joi.string().valid("User", "Volunteer").optional(),
});
export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
  }),
});
export const sendCodeSchema = Joi.object({
  email: Joi.string().email().required(),
});
export const forgetpassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
  }),
  code: Joi.string().length(4).required(),
});
