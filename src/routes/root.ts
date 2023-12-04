import { Router } from "express";
import controller from '../controller/rootcontroller'

const router = Router()

router
.route('/')
.get(controller.getHome)

router
.route('/store')
.get(controller.getStore)

router
.route('/build')
.get(controller.getBuild)

router
.route('/merch')
.get(controller.getMerch)

router
.route('/signin')
.get(controller.getSignin)

router
.route('/cart')
.post(controller.addTocart)
.patch(controller.reduceCartItem)

router
.route('/order')
.post(controller.placeOrder)
router
.route('/product/:id')
.get(controller.fetchProductDetails)




export default router