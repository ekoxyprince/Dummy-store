
export default (controller:any)=>async (req:any,res:any,next:any)=>{
   try {
    await controller(req,res)
   } catch (error) {
    console.log(error)
   }
}