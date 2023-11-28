import {Sequelize} from 'sequelize'
import config from '../config'
export const sequelize = new Sequelize(config.database as string,config.user as string,config.password as string,{
    dialect:'mysql',
    host:'localhost'
})

export const connectToDb = ()=>{
    return sequelize.authenticate()
}
