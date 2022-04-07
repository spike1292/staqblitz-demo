import { LitElement, html } from 'lit';


export class MFEButtonElement extends LitElement {
  static properties = {
    text: { type: String },
  };

  text = 'Push me!';

  protected render() {
    return html`<button type="button" class="btn btn-outline-secondary">
      ${this.text}
    </button>`;
  }

  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }
}

customElements.define('mfe-button', MFEButtonElement);

declare global {
  interface HTMLElementTagNameMap {
    'mfe-button': MFEButtonElement;
  }
}
