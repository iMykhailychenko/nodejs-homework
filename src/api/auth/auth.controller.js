import bcrypt from 'bcrypt';
import UserModel from '../users/users.model';
import { errorWrapper, newError } from '../../config/helpers';

export const registration = errorWrapper(async (req, res) => {
  const { password, email, subscription } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) throw newError('Email in use', 409);

  await UserModel.create({
    email,
    subscription,
    password,
  });

  res.status(201).json({ email, subscription });
});

export const login = errorWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw newError('Wrong email or password', 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw newError('Wrong email or password', 401);

  const token = await user.createToken();

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
});

export const logout = errorWrapper(async (req, res) => {
  const { token, user } = req;
  user.tokens = user.tokens.filter(data => data.token !== token);
  await user.save();
  res.status(204).send();
});
