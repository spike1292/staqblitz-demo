export class AuthenticationService {
  login(username: string, password: string) {
    return fetch('/api/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then(({ token }) => {
        localStorage.setItem('auth-token', token);
        localStorage.setItem('username', username);
      });
  }

  public logout() {
    localStorage.removeItem('auth-token');
  }

  public isLoggedIn() {
    return localStorage.getItem('auth-token') != null;
  }

  public getUserName() {
    return localStorage.getItem('username');
  }
}

export const authService = new AuthenticationService();
