import { Model,DataTypes } from "sequelize";
import { sequelize } from "../utilities/database";

export default class ProductDetail extends Model{
    declare id : number;
    declare color: string;
}
ProductDetail.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'product_details',
    sequelize
})