import { Request, Response } from 'express';
import { ArtistService } from '../services/artist.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class ArtistController {
  private artistService = new ArtistService();

  getArtists = async (req: Request, res: Response) => {
    const filters = req.query;
    const artists = await this.artistService.getArtists(filters);
    res.json(artists);
  };

  getArtistById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const artist = await this.artistService.getArtistById(id);
    res.json(artist);
  };

  updatePortfolio = async (req: AuthRequest, res: Response) => {
    const artistId = req.user.id;
    const portfolio = req.body;
    const result = await this.artistService.updatePortfolio(artistId, portfolio);
    res.json(result);
  };

  updateAvailability = async (req: AuthRequest, res: Response) => {
    const artistId = req.user.id;
    const availability = req.body;
    const result = await this.artistService.updateAvailability(artistId, availability);
    res.json(result);
  };

  getArtistStats = async (req: AuthRequest, res: Response) => {
    const artistId = req.user.id;
    const stats = await this.artistService.getArtistStats(artistId);
    res.json(stats);
  };
}