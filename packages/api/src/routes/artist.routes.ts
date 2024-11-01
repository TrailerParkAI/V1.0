import { Router } from 'express';
import { ArtistController } from '../controllers/artist.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { portfolioSchema, availabilitySchema } from '../schemas/artist.schema';

const router = Router();
const controller = new ArtistController();

router.get('/', controller.getArtists);
router.get('/:id', controller.getArtistById);

// Protected routes
router.use(authenticate);
router.use(authorize('artist'));

router.put('/portfolio', validateRequest(portfolioSchema), controller.updatePortfolio);
router.put('/availability', validateRequest(availabilitySchema), controller.updateAvailability);
router.get('/stats', controller.getArtistStats);

export default router;