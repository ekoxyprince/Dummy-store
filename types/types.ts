
export type UserAttribute  = {
    id:number,
    username:string,
    role:string,
    password:string,
    email:string
}
export type ProductAttribute = {
    id:number;
    name:string;
    category:string;
    description:string;
    price:number;
}
export type ProductRequestBody = {
    name:string,
    price:number,
    description:string,
    category:string,
    image:string
}
export type CartAttribute = {
    id:number
    name:string
    price:number,
    image:string,
    quantity:number
}