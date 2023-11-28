import Product from "../models/products"
import trycatch from "../utilities/trycatch"
import { ProductAttribute,ProductRequestBody } from "../types/types"
import { validationResult } from "express-validator"
import fs from 'fs'

export default {
    dashboard:(req:any,res:any,next:any)=>{
        res.render('./admin/dashboard')
    },
    product:trycatch(async(req:any,res:any,next:any)=>{
        let products:Array<Product> = await Product.findAll()
        res.render('./admin/products',{
            products:products
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
      const destroyedProduct:any = await product!.destroy()
      fs.unlink(`./public${destroyedProduct.image}`,(err)=>{
         if(err) throw err;
         res.redirect('/admin/products')
      })
    })
}