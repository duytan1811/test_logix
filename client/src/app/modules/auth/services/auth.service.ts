import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { environment } from '../../../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { BaseResponse } from 'src/app/shared/models/base-response.model';

const API_USERS_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_USERS_URL}/login`, {
      username,
      password,
    });
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(token: string): Observable<BaseResponse<UserModel>> {
    const httpHeaders = new HttpHeaders({
      Authorization: `${token}`,
    });
    return this.http.get<BaseResponse<UserModel>>(`${API_USERS_URL}/user`, {
      headers: httpHeaders,
    });
  }
}
