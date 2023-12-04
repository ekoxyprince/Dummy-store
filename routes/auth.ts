import {Router} from 'express';
const router:Router = Router();
import controller from '../controller/authcontroller';
import validate from '../middlewares/validation';

router
.route('/signin')
.post([validate.email,validate.password],controller.signin)
router
.route('/logout')
.get(controller.signout)
export default router