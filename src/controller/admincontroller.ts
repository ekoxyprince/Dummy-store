import Product from "../models/products"
import trycatch from "../utilities/trycatch"
import { ProductAttribute,ProductRequestBody } from "../types/types"
import { sequelize } from "../utilities/database"
import { validationResult } from "express-validator"
import Payment from "../models/payment"
import fs from 'fs'
import Order from "../models/orders"
import OrderItem from "../models/order-items"
import config from "../config"
import mail from "../helpers/mail"

export default {
    dashboard:trycatch(async(req:any,res:any,next:any)=>{
        const order:Array<Order> = await Order.findAll({limit:5,order:[['id','DESC']]})
        res.render('./admin/dashboard',{
            path:'/dashboard',
            orders:order,
            totalProduct:(await Product.findAll()).length,
            totalOrders:(await Order.findAll()).length,
            revenue:(await Order.findAll({
                where:{status:'processed'},
                attributes:[
                    [sequelize.fn('SUM',sequelize.col('total')),'totalSum']
                ]
            }))[0]['dataValues']['totalSum']
        })
    }),
    product:trycatch(async(req:any,res:any,next:any)=>{
        let products:Array<Product> = await Product.findAll()
        res.render('./admin/products',{
            products:products,
            path:'/products'
        })
    }),
    addProduct:(req:any,res:any,next:any)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({success:false,body:{status:"validation error",data:errors.array()[0]}}) 
        }
        const {name,price,description,category} = req.body as ProductRequestBody
        req.user.createProduct({
            name:name,category:category,
            price:price,description:description,
            image:(`${req.file.destination}${req.file.filename}`).slice(8)
        })
        .then((created:Product)=>{
         res.json({success:true,body:{status:'Product Created',data:created}})
        })
        .catch((error:any)=>{
            console.log(error)
        })
    },
    deleteProduct:trycatch(async (req:any,res:any,next:any)=>{
      const {id} = req.body
      const product:Product|null = await Product.findByPk(id)
      const destroyedProduct:any = await product?.destroy()
      fs.unlink(`./public${destroyedProduct.image}`,(err)=>{
         if(err) throw err;
         res.redirect('/admin/products')
      })
    }),
    addPayment:(req:any,res:any,next:any)=>{
        type RequestBody = {name:string,category:string,first:string,second:string,third:string}
        const {name,category,first,second,third} = req.body as RequestBody
        Payment.create({
            name:name,
            firstDetail:first,
            secondDetail:second,
            thirdDetail:third,
            category:category
        })
        .then((payment:Payment)=>{
            res.json({success:true,body:{status:'Payment Created',data:payment}})
        })
        .then(error=>{
            console.log(error)
        })
    },
    removePayment:trycatch(async(req:any,res:any,next:any)=>{
        const {id} = req.body
        const payment:Payment|null = await Payment.findByPk(id)
        const destroyedPayment:any = await payment?.destroy()
        res.redirect('/admin/payments')
    }),
    getPayment:trycatch(async(req:any,res:any,next:any)=>{
        res.render('./admin/payment',{
            payment:await Payment.findAll(),
            path:'/payments'
        })
    }),
    getOrders:trycatch(async(req:any,res:any,next:any)=>{
        res.render('./admin/orders',{
            orders:await Order.findAll(),
            path:'/orders'
        })
    }),
    gerOrderDetails:trycatch(async(req:any,res:any,next:any)=>{
        const {id} = req.params
        const order = await Order.findOne({include:OrderItem,where:{id:id}})
        res.render('./admin/orderdetails',{
            order:order,
            path:'/order_details'
        })
    }),
    updateOrder:(req:any,res:any,next:any)=>{
        const {id} = req.body
        Order.findByPk(id)
        .then((order:Order|null)=>{
            order!.status = 'processed'
            return order?.save()
        })
        .then(order=>{
            mail(order!.email,`We have processed your order. The details for your order are below:<br>
            Order Number: <b>${order?.orderNo}</b> <br>
            fullname: <b>${order?.fullname}</b> <br>
            email: <b>${order?.email}</b> <br>
            delivery address: <b>${order?.address}</b> <br>
            Status: <b style="color:green;">${order?.status}</b> <br>
            .
            `,order!.fullname,'Order Processed')
            mail(config.email!,`You have processed this Order. The details for your order are below:<br>
            Order Number: <b>${order?.orderNo}</b> <br>
            fullname: <b>${order?.fullname}</b> <br>
            email: <b>$${order?.email}</b> <br>
            delivery address: <b>${order?.address}</b> <br>
            Status: <b style="color:green;">${order?.status}</b> <br>
            `,'Francis Admin','Order Processed')
            res.redirect('/admin/orders')
        })
        .catch(err=>console.log(err))

    },
    removeOrder:(req:any,res:any,next:any)=>{
        const {id} = req.body
        Order.findByPk(id)
        .then(order=>{
            return order?.destroy()
        })
        .then(destroyed=>{
            res.redirect('/admin/orders')
        })
        .catch(err=>console.log(err))
    }
}