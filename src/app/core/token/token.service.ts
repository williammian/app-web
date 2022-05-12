import { Injectable } from "@angular/core";
import * as jwt_decode from 'jwt-decode';

const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  getPayloadToken() {
    const authToken = this.getToken();
    const token = authToken.substring(7);
    const payload = jwt_decode(token);
    return payload;
  }

  isTokenValido() {
    const payload = this.getPayloadToken();
    const exp = payload['exp'];
    const now = (new Date().getTime() + 1) / 1000;
    if(exp < now) {
      return false;
    }
    return true;
  }

}
