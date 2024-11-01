import { ApiService } from './api.service';
import { User } from '../models';

export class AuthService {
  private static instance: AuthService;
  private api: ApiService;

  private constructor() {
    this.api = ApiService.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    const response = await this.api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password
    });
    this.api.setToken(response.token);
    return response.user;
  }

  async register(userData: Partial<User>, password: string): Promise<User> {
    const response = await this.api.post<{ token: string; user: User }>('/auth/register', {
      ...userData,
      password
    });
    this.api.setToken(response.token);
    return response.user;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout', {});
    this.api.setToken(null);
  }
}