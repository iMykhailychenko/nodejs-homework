import mongoose from 'mongoose';
import Joi from 'joi';

const ContactScheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        const { error } = Joi.string()
          .email()
          .validate(email);

        if (error) throw new Error('Email is not valid');
      },
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(phone) {
        const { error } = Joi.string()
          .length(10)
          .pattern(/^[0-9]+$/)
          .validate(phone);

        if (error) throw new Error('Phone is not valid');
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
    validate: {
      validator(password) {
        const { error } = Joi.string()
          .pattern(/^[a-zA-Z0-9]{3,30}$/)
          .validate(password);

        if (error) throw new Error('Password is not valid');
      },
    },
  },
  token: { type: String, default: '' },
});

export default mongoose.model('Contact', ContactScheme);
