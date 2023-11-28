import Product from '../models/products'
import trycatch from '../utilities/trycatch'
import { CartAttribute, ProductAttribute } from '../types/types'
import carttotal from '../helpers/carttotal'

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
  }  
}