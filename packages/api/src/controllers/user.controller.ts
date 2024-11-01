import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class UserController {
  private userService = new UserService();

  getProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const user = await this.userService.getProfile(userId);
    res.json(user);
  };

  updateProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const data = req.body;
    const user = await this.userService.updateProfile(userId, data);
    res.json(user);
  };

  updateNotificationPreferences = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const preferences = req.body;
    const result = await this.userService.updateNotificationPreferences(userId, preferences);
    res.json(result);
  };

  uploadProfilePicture = async (req: AuthRequest, res: Response) => {
    const userId = req.user.id;
    const file = req.file;
    const result = await this.userService.uploadProfilePicture(userId, file);
    res.json(result);
  };
}