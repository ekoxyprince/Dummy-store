import Product from '../models/products'
import trycatch from '../utilities/trycatch'
import { CartAttribute, ProductAttribute } from '../types/types'
import carttotal from '../helpers/carttotal'
import Order from '../models/orders'
import OrderItem from '../models/order-items'
import Payment from '../models/payment'
import mail from '../helpers/mail'
import config from '../config'

export default {
  getHome:(req:any,res:any,next:any)=>{
    res.render('./pages/home',{
      cart:req.session.cart,
      subtotal:carttotal(req.session.cart)
    })
  },
  getStore:trycatch(async(req:any,res:any,next:any)=>{
    const products:Array<ProductAttribute> = await Product.findAll({where:{category:'store'}})
    res.render('./pages/store',{
      products,cart:req.session.cart,
      subtotal:carttotal(req.session.cart)
    })
  }),
  getMerch:trycatch(async(req:any,res:any,next:any)=>{
    const products:Array<ProductAttribute> = await Product.findAll({where:{category:'merch'}})
    res.render('./pages/merch',{
      products,cart:req.session.cart,
      subtotal:carttotal(req.session.cart)
    })
  }),
  getBuild:trycatch(async(req:any,res:any,next:any)=>{
    const products:Array<ProductAttribute> = await Product.findAll({where:{category:'build'}})
    res.render('./pages/build',{
      products,cart:req.session.cart,
      subtotal:carttotal(req.session.cart)
    })
  }),
  getSignin:(req:any,res:any,next:any)=>{
    res.render('./auth/signin')
  },
  addTocart:trycatch(async(req:any,res:any,next:any)=>{
   const {prodId} = req.body
   const cart:Array<CartAttribute> = req.session.cart
   const product:Product|null = await Product.findByPk(prodId)
   if(!product){
    return res.json({success:false,body:{status:"Verification Error",data:{path:'id',msg:'No product found'}}})
   }
   const productIndex:number = cart.findIndex(cart=>cart.id === prodId)
   if(productIndex>-1){
    cart[productIndex].quantity = cart[productIndex].quantity+1
    cart[productIndex].price = product.price*cart[productIndex].quantity

   }else{
  const newCartProduct:CartAttribute = {id:prodId,price:product.price,name:product.name,image:product.image,quantity:1}
  cart.push(newCartProduct)
   }
   res.json({success:true,body:{status:'Added Successfully',data:{msg:"Added to cart",cart}}})
  }),
  reduceCartItem:trycatch(async(req:any,res:any,next:any)=>{
    const {prodId} = req.body
    const cart:Array<CartAttribute> = req.session.cart
    const product:Product|null = await Product.findByPk(prodId)
    if(!product){
     return res.json({success:false,body:{status:"Verification Error",data:{path:'id',msg:'No product found'}}})
    }
    const productIndex:number = cart.findIndex(cart=>cart.id === prodId)
    if(productIndex>-1){
      cart[productIndex].quantity = cart[productIndex].quantity-1
      cart[productIndex].price = product.price*cart[productIndex].quantity
    }
    if(cart[productIndex]?.quantity === 0){
      req.session.cart = cart.filter(cart=>cart.id !== prodId)
     }
    res.json({success:true,body:{status:'Removed Successfully',data:{msg:"Removed from cart",cart}}})
  }),
  fetchProductDetails:(req:any,res:any,next:any)=>{
    const {id} = req.params
    Product.findByPk(id)
    .then((product:Product|null)=>{
      if(!product){
        return res.json({success:false,body:{status:"Verification Error",data:{path:'id',msg:'No product found'}}})
      }
      res.json({success:true,body:{status:'Response successful',data:{msg:"Fetched successfully",product}}})
    })
    .catch(err=>console.error(err))
  },
  placeOrder:(req:any,res:any,next:any)=>{
    const {cart} = req.session
    const {name,email,address,category} = req.body
    const orderNo:number =Math.floor((Math.random()*900000)+100000)
    const total:number = carttotal(req.session.cart)
    if(req.session.cart.length<1){
      return res.json({msg:"Invalid response"})
    }
    Order.create({
      fullname:name,
      email:email,
      address:address,
      payment:category,
      total:carttotal(req.session.cart),
      orderNo:orderNo,
      status:'pending'
    })
    .then(order=>{
       cart.map(c=>{
        c.OrderId = order.id
        c.id = undefined
      })
      return OrderItem.bulkCreate(cart)
    })
    .then(orderItems=>{
      req.session.cart = []
    return Payment.findAll({where:{category:category}})
    })
    .then(payments=>{
      mail(email,`We have received your order and will be processed shortly. The details for your order are below:<br>
      Order Number: <b>${orderNo}</b> <br>
      fullname: <b>${name}</b> <br>
      email: <b>${email}</b> <br>
      delivery address: <b>${address}</b> <br>
      Status: <b style="color:red;">Pending</b> <br>
      Kindly send your proof of payment to our email.
      `,name,'Order Confirmation')
      mail(config.email!,`A new order has been placed recently kingly process the order. The details for your order are below:<br>
      Order Number: <b>${orderNo}</b> <br>
      fullname: <b>${name}</b> <br>
      email: <b>${email}</b> <br>
      delivery address: <b>${address}</b> <br>
      Kindly send your proof of payment to our email.
      `,'Francis Admin','Order Confirmation')
      res.render('./pages/payment',{
        payments,cart:req.session.cart
      })
    }).catch(err=>console.log(err))
  }

}