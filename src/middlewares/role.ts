
export const admin = (req:any,res:any,next:any)=>{
   if(req.user?.role !== 'admin'){
    return res.redirect('/signin')
   }
   next()
}

export const user = (req:any,res:any,next:any)=>{
    if(req.user?.role !== 'user'){
     return res.redirect('/signin')
    }
    next()
 }
