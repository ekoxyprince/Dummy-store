import config from './config'
import * as http from 'http'
import app from './app'
const port:string = config.port!
const server = http.createServer(app)
import { sequelize,connectToDb } from './utilities/database'
import User from './models/users'
import Product from './models/products';
import ProductDetail from './models/product-details';
import Payment from './models/payment';
import Order from './models/orders';
import OrderItem from './models/order-items';

Product.belongsTo(User)
User.hasMany(Product)
Product.hasMany(ProductDetail)
ProductDetail.belongsTo(Product)
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

connectToDb()
.then(connected=>{
 console.log('connected to database')   
 return sequelize.sync()
})
.then(synced=>{
    return User.findByPk(1)
})
.then(user=>{
  if(!user){
    User.create({
        email:'admin@admin.com',
        username:'admin',
        role:'admin',
        password:'$2a$12$KVu4k0LbsB/jDsIXEZ3ZuOPiZaQEzyZZAamMBDBSC7M3lWAUCW4e6'
    })
    return true
  }
})
.then(created=>{
    server.listen(port,()=>{
        console.log(`Listening on port ${port}`)
    })
})
.catch(error=>{
    console.log(error)
})
