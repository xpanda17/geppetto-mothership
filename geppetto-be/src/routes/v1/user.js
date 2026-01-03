import express from 'express';
import { createUser } from '#controllers/v1/user/create';

const router = express.Router();

router.post('/users', createUser);

export default router;