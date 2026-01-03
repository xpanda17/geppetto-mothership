import express from 'express';
import { createUser } from '#controllers/v1/user/create';
import { login } from '#controllers/v1/user/login';
import { authorize } from '#middlewares/auth';
import { ROLES } from '#constants/role'

const router = express.Router();

router.post(
    '/',
    authorize([ROLES.ADMIN]),
    createUser
);

router.post(
    '/login',
    login
);

export default router;