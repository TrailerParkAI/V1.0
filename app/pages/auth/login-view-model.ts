import { Observable } from '@nativescript/core';
import { AuthService } from '../../shared/services/auth.service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onLogin() {
    if (!this.email || !this.password) {
      // Show error message
      return;
    }

    try {
      this.set('isLoading', true);
      const user = await this.authService.login(this.email, this.password);
      
      // Navigate to appropriate dashboard based on user role
      const page = 'pages/dashboard/' + user.role + '-dashboard';
      const frame = require('@nativescript/core').Frame.topmost();
      frame.navigate({
        moduleName: page,
        clearHistory: true
      });
    } catch (error) {
      console.error('Login error:', error);
      // Show error message
    } finally {
      this.set('isLoading', false);
    }
  }
}