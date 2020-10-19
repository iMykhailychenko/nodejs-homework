import express from 'express';
import * as contacts from './contacts.controller';

const router = express.Router();

router.get('/', contacts.getContacts);
router.get('/:contactId', contacts.getContactById);
router.post('/', contacts.postContact);
router.delete('/:contactId', contacts.deleteContact);
router.patch('/:contactId', contacts.updateContact);

export default router;
