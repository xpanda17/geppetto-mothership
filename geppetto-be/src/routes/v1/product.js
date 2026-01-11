import express from 'express';
import { syncProduct } from '#controllers/v1/product/sync';
import { getProducts } from '#controllers/v1/product/get-all';
import { generateCatalog } from '#controllers/v1/product/generate-catalog';
import { authorize } from '#middlewares/auth';
import { ROLES } from '#constants/role'

const router = express.Router();

router.post(
    '/sync',
    authorize([ROLES.ADMIN]),
    syncProduct
);

router.get(
    '/catalog/pdf',
    authorize([ROLES.ADMIN]),
    generateCatalog
);

router.get('/', authorize(), getProducts);

export default router;
