import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/api-error';
import { RegisterData, LoginCredentials, AuthResponse } from '@inqut/shared';

export class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id
      }
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new ApiError(400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    const token = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id
      }
    });

    return {
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenRecord || !tokenRecord.user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const token = this.generateToken(tokenRecord.user.id);
    return { token };
  }

  async logout(refreshToken: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { token: refreshToken }
    });
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
  }

  private generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: '7d'
    });
  }
}