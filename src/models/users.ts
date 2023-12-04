import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utilities/database";

export default class User extends Model{
    declare id : number;
    declare username:string;
    declare email:string;
    declare password:string;
    declare role:string;
}
User.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
       allowNull:false,
       type:DataTypes.STRING
    },
    email:{
        allowNull:false,
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:'users',
    sequelize
})

