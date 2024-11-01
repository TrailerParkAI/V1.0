import { Router } from 'express';
import { StudioController } from '../controllers/studio.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { updateStudioSchema } from '../schemas/studio.schema';

const router = Router();
const controller = new StudioController();

router.get('/', controller.getStudios);
router.get('/:id', controller.getStudioById);

// Protected routes
router.use(authenticate);
router.use(authorize('studio'));

router.put('/', validateRequest(updateStudioSchema), controller.updateStudio);
router.post('/artists', controller.addArtist);
router.delete('/artists/:artistId', controller.removeArtist);

export default router;