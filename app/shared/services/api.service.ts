import { Http } from '@nativescript/core';

export class ApiService {
  private static instance: ApiService;
  private baseUrl = 'https://api.inqut.com/v1';
  private token: string | null = null;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await Http.request({
      url: `${this.baseUrl}${endpoint}`,
      method: 'GET',
      headers: this.getHeaders()
    });
    return response.content.toJSON();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await Http.request({
      url: `${this.baseUrl}${endpoint}`,
      method: 'POST',
      headers: this.getHeaders(),
      content: JSON.stringify(data)
    });
    return response.content.toJSON();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await Http.request({
      url: `${this.baseUrl}${endpoint}`,
      method: 'PUT',
      headers: this.getHeaders(),
      content: JSON.stringify(data)
    });
    return response.content.toJSON();
  }

  async delete(endpoint: string): Promise<void> {
    await Http.request({
      url: `${this.baseUrl}${endpoint}`,
      method: 'DELETE',
      headers: this.getHeaders()
    });
  }
}