import {Router} from 'express';
import { UserController } from '../controllers/User.controller';
import { checkJWT } from '../middleware/jwt';

const router = Router();

router.get('/users',[checkJWT],UserController.getUsers);
router.get('/users/:id',[checkJWT], UserController.getUser);
router.post('/users',UserController.postUser);





export default router;