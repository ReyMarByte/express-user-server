import Joi from "joi"
export  const userSchema = Joi.object({
    id: Joi.number().min(1).max(1000).required(),
    userName: Joi.string().max(30).required()
});