import { Request, Response } from 'express';
import { StudioService } from '../services/studio.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class StudioController {
  private studioService = new StudioService();

  getStudios = async (req: Request, res: Response) => {
    const filters = req.query;
    const studios = await this.studioService.getStudios(filters);
    res.json(studios);
  };

  getStudioById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const studio = await this.studioService.getStudioById(id);
    res.json(studio);
  };

  updateStudio = async (req: AuthRequest, res: Response) => {
    const studioId = req.user.id;
    const data = req.body;
    const studio = await this.studioService.updateStudio(studioId, data);
    res.json(studio);
  };

  addArtist = async (req: AuthRequest, res: Response) => {
    const studioId = req.user.id;
    const { artistId } = req.body;
    const result = await this.studioService.addArtist(studioId, artistId);
    res.json(result);
  };

  removeArtist = async (req: AuthRequest, res: Response) => {
    const studioId = req.user.id;
    const { artistId } = req.params;
    await this.studioService.removeArtist(studioId, artistId);
    res.status(204).send();
  };
}