import {Model,DataTypes} from 'sequelize';
import { sequelize } from '../utilities/database';

export default class Product extends Model{
    declare id : number;
    declare name : string;
    declare category: string;
    declare image : string;
    declare description : string;
    declare price : number
}
Product.init({
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
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },

},{
    tableName:"products",
    sequelize
})