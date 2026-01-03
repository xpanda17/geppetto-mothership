import express from 'express';
import { createUser } from '#controllers/v1/user/create';
import { authorize } from '#middlewares/auth';
import { ROLES } from '#constants/role'

const router = express.Router();

router.post('/', authorize([ROLES.ADMIN]), createUser);

export default router;