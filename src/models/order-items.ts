import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utilities/database";

export default class OrderItem extends Model{
   declare id:number;
   declare name:string;
   declare price:number;
   declare quantity:number;
   declare image : string;
}

OrderItem.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'order_items',
    sequelize
})