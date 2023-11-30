import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utilities/database";

export default class Order extends Model{
    declare id : number;
    declare orderNo : number;
    declare fullname :string;
    declare email : string;
    declare address : string;
    declare total : number;
    declare payment : string;
}

Order.init({
  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  orderNo:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  fullname:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  address:{
    type:DataTypes.STRING,
    allowNull:false
  },
  payment:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
    tableName:'orders',
    sequelize
})