import {Router} from 'express';
const router = Router();
import controller from '../controller/admincontroller';
import auth from '../middlewares/auth';
import { admin } from '../middlewares/role';
import upload from '../middlewares/fileupload'
import validate from '../middlewares/validation'

router
.route('/dashboard')
.get([auth,admin],controller.dashboard)

router
.route('/products')
.get([auth,admin],controller.product)
.post([auth,admin],
    [upload.single('file'),validate.name,validate.category,validate.description,validate.amount],
    controller.addProduct)
.delete([auth,admin],controller.deleteProduct)

router
.route('/payments')
.get([auth,admin],controller.getPayment)
.post([auth,admin],controller.addPayment)
.delete([auth,admin],controller.removePayment)

router
.route('/orders')
.get([auth,admin],controller.getOrders)
.patch([auth,admin],controller.updateOrder)
.delete([auth,admin],controller.removeOrder)

router
.route('/order_details/:id')
.get([auth,admin],controller.gerOrderDetails)


export default router