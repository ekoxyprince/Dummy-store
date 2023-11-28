export default (req:any,res:any,next:any)=>{
    if(!req.session.cart){
        req.session.cart = []
    }
    next()
}