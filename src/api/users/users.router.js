import express from 'express';
import * as controller from './users.controller';
import checkToken from '../../middlewares/auth';

const router = express.Router();

router.get('/current', checkToken, controller.getUser);
router.patch('/', checkToken, controller.updateUser);

export default router;
