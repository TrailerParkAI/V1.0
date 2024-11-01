import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { updateProfileSchema, notificationPreferencesSchema } from '../schemas/user.schema';

const router = Router();
const controller = new UserController();

router.use(authenticate);

router.get('/profile', controller.getProfile);
router.put('/profile', validateRequest(updateProfileSchema), controller.updateProfile);
router.put('/notifications', validateRequest(notificationPreferencesSchema), controller.updateNotificationPreferences);
router.post('/profile-picture', controller.uploadProfilePicture);

export default router;