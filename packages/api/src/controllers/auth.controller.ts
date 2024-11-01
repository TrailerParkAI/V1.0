import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ApiError } from '../utils/api-error';

export class AuthController {
  private authService = new AuthService();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    res.json(result);
  };

  register = async (req: Request, res: Response) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(result);
  };

  refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new ApiError(400, 'Refresh token is required');
    }
    const result = await this.authService.refreshToken(refreshToken);
    res.json(result);
  };

  logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await this.authService.logout(refreshToken);
    res.status(204).send();
  };
}