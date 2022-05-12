import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  authenticate(email: string, senha: string) {
    return this.http
      .post(API + '/auth', { email, senha }, { observe: 'response' })
      .pipe(tap(res => {
        const token = JSON.parse(JSON.stringify(res.body));
        const authToken = token.token;
        this.userService.setToken(authToken);
        console.log(`User ${email} authenticated with token ${authToken}`)
      }));

  }

}
