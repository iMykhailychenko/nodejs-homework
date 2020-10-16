import ContactScheme from './contacts.model';
import errorWrapper from '../config/helpers';

// controllers
export const getContacts = errorWrapper(async (req, res) => {
  res.send(await ContactScheme.find().limit(req.query.limit));
});

export const getContactById = errorWrapper(async (req, res) => {
  const constact = await ContactScheme.findById(req.params.contactId);
  if (!constact) throw new Error('Not found');
  res.send(constact);
});

export const postContact = errorWrapper(async (req, res) => {
  res.status(201).send(await ContactScheme.create(req.body));
});

export const datateContact = errorWrapper(async (req, res) => {
  const constact = await ContactScheme.findById(req.params.contactId);
  if (!constact) throw new Error('Not found');
  constact.remove();
  res.send({ message: 'contact deleted' });
});

export const updateContact = errorWrapper(async (req, res) => {
  const constact = await ContactScheme.findByIdAndUpdate(
    req.params.contactId,
    { $set: req.body },
    { new: true },
  );

  if (!constact) throw new Error('Not found');
  res.send(constact);
});
