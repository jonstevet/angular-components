import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../app/models/auth.model';
import { User } from '../../app/models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  login(email:string, password:string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    )

  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
  }

  loginAndProfile(email:string, password:string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }


}
