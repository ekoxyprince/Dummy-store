import {validationResult } from "express-validator"
import User from '../models/users'
import * as bcrypt from 'bcryptjs'
import { UserAttribute } from "../types/types"


export default {
    signin:(req:any,res:any,next:any)=>{
      const errors = validationResult(req)
      type RequestBody = {email:string,password:string}
      const {email,password} = req.body as RequestBody
      if(!errors.isEmpty()){
       return res.json({success:false,body:{status:"validation error",data:errors.array()[0]}})
      }
      User.findOne({where:{email:email}})
      .then((user:UserAttribute | null)=>{
        if(!user){
          return res.json({success:false,body:{status:"Authentication Error",data:{path:'email',msg:'No user found'}}})
        }
        console.log(password,user.password)
        return bcrypt.compare(password,user.password)
        .then((doMatch:Boolean)=>{
          if(!doMatch){
            return res.json({success:false,body:{status:"Authentication Error",data:{path:'email',msg:'Incorrect Password'}}})
          }
          req.session.isLoggedIn = true
          req.session.user = user
          res.json({success:true,body:{status:'Authentication successful',data:{msg:'Signin successful'}}})
        })
      })
      .catch(error=>{

      })
    },
    signout:(req:any,res:any,next:any)=>{
      req.session.destroy((err:Error)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/signin')
        }

      })
    }
}