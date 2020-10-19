import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { newError } from '../../config/helpers';
import env from '../../config/env';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        const { error } = Joi.string()
          .email()
          .validate(email);

        if (error) throw newError('Email is not valid', 422);
      },
    },
  },
  subscription: {
    type: String,
    required: true,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { type: String, required: true },
      expires: { type: Date, required: true },
    },
  ],
});

UserSchema.static(
  'hashPassword',
  async password => await bcrypt.hash(password, env.auth.salt),
);

UserSchema.method('isPasswordValid', async function(password) {
  return await bcrypt.compare(password, this.password);
});

UserSchema.method('createToken', async function() {
  const token = await jwt.sign({ id: this._id }, env.auth.accesKey);

  this.tokens = [
    ...this.tokens,
    { token, expires: new Date().getTime() + 24 * 60 * 60 * 1000 },
  ];

  await this.save();

  return token;
});

UserSchema.pre('save', async function() {
  if (this.isNew) {
    this.password = await this.constructor.hashPassword(this.password);
  }
});

export default mongoose.model('User', UserSchema);
