import ContactModel from './contacts.model';
import { errorWrapper, newError } from '../../config/helpers';

export const getContacts = errorWrapper(async (req, res) => {
  const { page, limit, sub } = req.query;
  const customLabels = {
    totalDocs: 'total',
    docs: 'contacts',
  };
  const options = {
    page: page || 1,
    limit: limit || 10,
    customLabels,
  };
  res.send(await ContactModel.paginate(sub ? { subscription: sub } : {}, options));
});

export const getContactById = errorWrapper(async (req, res) => {
  const contact = await ContactModel.findById(req.params.contactId);
  if (!contact) throw newError('Not found', 404);
  res.send(contact);
});

export const postContact = errorWrapper(async (req, res) => {
  res.status(201).send(await ContactModel.create(req.body));
});

export const deleteContact = errorWrapper(async (req, res) => {
  const contact = await ContactModel.findById(req.params.contactId);
  if (!contact) throw newError('Not found', 404);
  await contact.remove();
  res.send({ message: 'contact deleted' });
});

export const updateContact = errorWrapper(async (req, res) => {
  const contact = await ContactModel.findByIdAndUpdate(
    req.params.contactId,
    { $set: req.body },
    { new: true },
  );

  if (!contact) throw newError('Not found', 404);
  res.send(contact);
});
