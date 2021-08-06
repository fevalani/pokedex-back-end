import Joi from "joi";

const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  confirmPassword: Joi.any().equal(Joi.ref("password")).required(),
});

export { UserSchema };
