import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();
const controller = new AuthController();

router.post('/login', validateRequest(loginSchema), controller.login);
router.post('/register', validateRequest(registerSchema), controller.register);
router.post('/refresh-token', controller.refreshToken);
router.post('/logout', controller.logout);

export default router;