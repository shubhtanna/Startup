import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/Product.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();
router.post('/createproduct', auth, createProduct);
router.get('/getproduct', getProduct);
router.get('/getproducts', getProducts);
router.put('/updateproduct', auth, updateProduct);
router.delete('/deleteproduct', auth, deleteProduct);
export default router;
