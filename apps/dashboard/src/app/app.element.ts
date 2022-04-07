import { LitElement, html } from 'lit';
import { authService } from '@mfe/auth-core';
import './current-weather.element';

export class MFEDashboardElement extends LitElement {
  static properties = {
    count: { type: Number },
  };

  count = 0;

  protected render() {
    const isLoggedIn = authService.isLoggedIn();
    const user = authService.getUserName();

    if (isLoggedIn) {
      return html`
        <section class="container">
          <header>
            <h1>Welcome, ${user}!</h1>
          </header>
          <mfe-current-weather class="mt-3 mb-3"></mfe-current-weather>
          <footer>
            <button type="button" class="btn btn-primary" @click=${this.logout}>
              Logout
            </button>
          </footer>
        </section>
      `;
    }

    return html`<section class="container">
      <header>
        <h1>Welcome</h1>
      </header>
      <p>
        Please login
        <a href="/login" class="link-primary">on the login page</a>.
      </p>
    </section>`;
  }

  private logout() {
    authService.logout();
    window.location.assign('/dashboard');
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }
}

customElements.define('mfe-dashboard', MFEDashboardElement);
