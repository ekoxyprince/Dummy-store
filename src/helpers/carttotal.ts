import { CartAttribute } from "../types/types";

export default  (items:Array<CartAttribute>):number=>{
 let total:number = 0;
 if(items.length === 0){
   total = 0
 }else{
    for(let i = 0; i<items.length;i++){
      total += Number(items[i].price)
    }
 }
 return total
}