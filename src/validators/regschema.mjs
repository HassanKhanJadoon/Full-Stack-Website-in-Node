import Joi from "joi";

const registrationSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(), // Assuming a 10-digit phone number
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.ref('password'),
  }).with('password', 'confirmPassword');

  export default registrationSchema;
