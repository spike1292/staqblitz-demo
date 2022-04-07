import { Injectable } from '@angular/core';
import { authService } from '@mfe/auth-core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get userName() {
    return authService.getUserName();
  }

  login(userName: string, password: string) {
    return authService.login(userName, password);
  }

  logout(): void {
    return authService.logout();
  }

  isLoggedIn() {
    return authService.isLoggedIn();
  }
}
