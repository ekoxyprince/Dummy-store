import User from "../models/users";
import { UserAttribute } from "../types/types";

export default (req:any,res:any,next:any)=>{
if(req.session?.isLoggedIn){
    const id:number = req.session.user.id
    User.findByPk(id)
    .then((user:UserAttribute | null)=>{
      if(!user){
        return res.redirect('/signin')
      }
      req.user = user
      next()
    })
    .catch(error=>console.error(error))
}else{
    res.redirect('/signin')
}
}