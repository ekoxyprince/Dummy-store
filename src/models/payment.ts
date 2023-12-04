import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utilities/database";

export default class Payment extends Model{
    declare id : number;
    declare category : string;
    declare name : string;
    declare firstDetail : string;
    declare secondDetail : string;
    declare thirdDetail : string;
}

Payment.init({
 id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
 },
 category:{
    type:DataTypes.STRING,
    allowNull:false
 },
 name:{
    type:DataTypes.STRING,
    allowNull:false
 },
 firstDetail:DataTypes.STRING,
 secondDetail:DataTypes.STRING,
 thirdDetail:DataTypes.STRING,
},{
    tableName:'payments',
    sequelize
})