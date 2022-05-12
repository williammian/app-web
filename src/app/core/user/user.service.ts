import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { TokenService } from './../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);

  private user: User;

  constructor(private tokenService: TokenService){
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getUserDto() {
    return this.user;
  }

  private decodeAndNotify() {
    const payload = this.tokenService.getPayloadToken();

    const user = JSON.parse(payload['sub']);
    this.user = user;

    this.userSubject.next(user);
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

}
