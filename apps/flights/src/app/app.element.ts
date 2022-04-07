import React from 'react';
import ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';

import { App } from './app';

export class FlightsElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);

    ReactDOM.render(React.createElement(App), mountPoint);
    retargetEvents(shadowRoot);
  }
}

customElements.define('mfe-flights', FlightsElement);
