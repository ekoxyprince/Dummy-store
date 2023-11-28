import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import rootRoute from './routes/root';
import authRoute from './routes/auth';
import adminRoute from './routes/admin';
import  session from 'express-session'
import SequelizeStore from 'connect-session-sequelize';
import { sequelize } from './utilities/database';
import config from './config'
import cartInitialization from './middlewares/cart';
const sessionStore = new (SequelizeStore(session.Store))({
    db: sequelize, 
    expiration: 86400000,
  });
import flash from 'connect-flash'
import methodOverride from 'method-override'

const app = express();
app.engine('ejs',ejs.renderFile);
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
  resave:false,
  secret:config.session_secret!,
  saveUninitialized:false,
  store:sessionStore
}))
sessionStore.sync()
app.use(methodOverride('_method'))
app.use(cartInitialization)

app.use('/',rootRoute)
app.use('/auth',authRoute);
app.use('/admin',adminRoute)


export default app
