import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Joi from 'joi';
import { newError } from '../../config/helpers';

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

        if (error) throw newError('Email is not valid', 422);
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

        if (error) throw newError('Phone is not valid', 422);
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
    min: 3,
  },
  token: { type: String, default: '' },
});

ContactScheme.plugin(mongoosePaginate);

export default mongoose.model('Contact', ContactScheme);
