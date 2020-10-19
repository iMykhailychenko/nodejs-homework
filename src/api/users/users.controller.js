import { errorWrapper, newError } from '../../config/helpers';
import UserModel from './users.model';

export const getUser = errorWrapper(async (req, res) => {
  const { _id, email, subscription } = req.user;
  res.status(200).json({ _id, email, subscription });
});

const SUBSCRIPTION = ['free', 'pro', 'premium'];

export const updateUser = errorWrapper(async (req, res) => {
  const { subscription } = req.body;
  if (!subscription || !SUBSCRIPTION.includes(subscription))
    throw newError('Invalid subscription', 400);

  await UserModel.findByIdAndUpdate(
    req.user._id,
    { $set: { subscription } },
    { new: true },
  );
  res.status(204).send();
});
