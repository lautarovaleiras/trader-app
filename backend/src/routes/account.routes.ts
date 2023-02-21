import { checkJWT } from './../middleware/jwt';
import { AccountController } from './../controllers/Account.controller';
import {Router} from 'express';

const router = Router();

router.post('/accounts',[checkJWT],AccountController.postAccount);
router.put('/accounts/:id',[checkJWT],AccountController.putAccount);
router.get('/accounts',[checkJWT],AccountController.getAccounts);
router.get('/accounts/:id',[checkJWT],AccountController.getAccount);
router.get('/accounts/user/:id',[checkJWT],AccountController.getAccountsByUserId);






export default router;