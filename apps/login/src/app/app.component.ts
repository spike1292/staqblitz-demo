import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@mfe/auth';

@Component({
  selector: 'mfe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  userName = '';
  password = '';

  async login() {
    await this.authService.login(this.userName, this.password);
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
