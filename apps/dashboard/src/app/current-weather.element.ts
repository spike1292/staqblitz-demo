import { html, css, LitElement } from 'lit';

const openWeatherMapApiKey = '8ebf4f448fb0db23d24e285b5683d1bb';

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

async function fetchWeatherData(latitude: number, longitude: number) {
  // https://openweathermap.org/current
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}&lang=nl&units=metric `;

  const result: any = await fetch(url, {
    method: 'GET',
  }).then((res) => (res.ok ? res.json() : {}));
  return {
    temperature: result?.main.temp,
    timestamp: (result?.dt ?? 0) * 1000,
    iconAlt: result?.weather[0].description,
    iconSrc: result?.weather[0].icon,
  };
}

async function currentWeather() {
  const position = await getPosition();
  const { longitude: long, latitude: lat } = position.coords;
  return await fetchWeatherData(lat, long);
}

const dateFormat = (value: Date) =>
  new Intl.DateTimeFormat('nl-NL').format(value);

const timeFormat = (value: Date) =>
  new Intl.DateTimeFormat('nl-NL', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneName: 'short',
  }).format(value);

export class MFECurrentWeather extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: initial;
      }
    `;
  }

  static get properties() {
    return {
      currentweather: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    currentWeather().then((weather) => (this.currentweather = weather));
  }

  currentweather: {
    iconAlt: string;
    iconSrc: string;
    temperature: number;
    timestamp: number;
  };

  render() {
    const timestamp = new Date(this.currentweather?.timestamp ?? Date.now());
    const date = dateFormat(timestamp);
    const time = timeFormat(timestamp);

    return html`
      <span id="temperature"
        >Current temperature: ${this.currentweather?.temperature}</span
      >
      °<span>C</span>
      <div>${this.currentweather?.iconAlt}</div>
      <div>Date of recording: ${date}</div>
      <div>Time of recording: ${time}</div>
    `;
  }
}

if (!customElements.get('mfe-current-weather')) {
  customElements.define('mfe-current-weather', MFECurrentWeather);
}

declare global {
  interface HTMLElementTagNameMap {
    'mfe-current-weather': MFECurrentWeather;
  }
}

export default MFECurrentWeather;
