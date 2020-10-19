import Joi from 'joi';
import { errorWrapper, newError } from '../config/helpers';

const authValidate = errorWrapper(async (req, _, next) => {
  const { error } = Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .validate(req.body.password);

  console.log(error);

  if (error) throw newError('Password is not valid', 422);
  next();
});

export default authValidate;
