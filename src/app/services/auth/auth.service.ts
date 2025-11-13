import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: Date;
  packId: number;
  roleIds: number[];
}



export interface UserResponse {
    id : number;
    firstName: string;
    lastName: string;
    email: string;
    userStatus: string;
}

export interface RegisterResponse {
  mfaSecret: string;
  qrCodeUrl: string;
  message: string;
}

export interface AuthRequest {
  email: string;
  password: string;
  otp?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  private readonly API_URL = 'http://localhost:8082/api/auth';

  public register(request: RegisterRequest): Observable<RegisterResponse>  {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, request, { withCredentials: true });
  }

  public login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request, { withCredentials: true });
  }

  public refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/refresh-token`,
      {},
      { withCredentials: true }
    );
  }

  public logout():Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {}, { withCredentials: true });
  }

  getCurrentUser():Observable<UserResponse> {
    return this.http.get<UserResponse>('http://localhost:8082/api/users/me', { withCredentials: true })
  }



}
