import express from 'express';
import { syncProduct } from '#controllers/v1/product/sync';
import { authorize } from '#middlewares/auth';
import { ROLES } from '#constants/role'

const router = express.Router();

router.post(
    '/sync',
    authorize([ROLES.ADMIN]),
    syncProduct
);

export default router;