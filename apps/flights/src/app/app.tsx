// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { authService } from '@mfe/auth-core';

// typescipt vertellen dat de web component mfe-button bestaat
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'mfe-button': any;
      'mfe-current-weather': any;
    }
  }
}

const WebComponentButton = lazy(() =>
  import('dashboard/Button').then(() => ({
    default: () => (
      <mfe-button text="Look Ma! I'm web component button"></mfe-button>
    ),
  }))
);

const CurrentWeather = lazy(() =>
  import('dashboard/CurrentWeather').then(() => ({
    default: () => <mfe-current-weather></mfe-current-weather>,
  }))
);

export function Home() {
  const [username] = useState(authService.getUserName());

  return (
    <section className="container">
      <header>
        <h1>Welcome, {username}!</h1>
      </header>

      <Suspense fallback={() => <div>Loading weather...</div>}>
        <div className="mt-3 mb-3">
          <CurrentWeather />
        </div>
      </Suspense>

      <footer>
        <Link to="/search">Search flights.</Link>
      </footer>
    </section>
  );
}

export function Search() {
  const [state, setState] = useState<
    {
      date: string;
      departure: string;
      arrival: string;
      price: number;
    }[]
  >([]);
  const getFlights = () => {
    fetch('api/flights')
      .then((res) => res.json())
      .then((flights) => setState(flights));
  };

  return (
    <section className="container">
      <header>
        <h1>Flights</h1>
      </header>
      <div className="row g-2 align-items-center">
        <div className="col-auto">
          <input className="form-control" type="text" placeholder="From" />
        </div>
        <div className="col-auto">
          <input type="text" className="form-control" placeholder="To" />
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={() => getFlights()}
          type="button"
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      <div className="mt-3">
        <Suspense fallback={() => <div>Loading...</div>}>
          <WebComponentButton />
        </Suspense>
      </div>

      {state.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Departure</th>
              <th scope="col">Arrival</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {state.map((s, i) => (
              <tr key={s.date + s.departure + s.arrival}>
                <th scope="row">{i}</th>
                <td>{dateFormat(s.date)}</td>
                <td>{s.departure}</td>
                <td>{s.arrival}</td>
                <td>{numberFormat(s.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

const numberFormat = (value: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);

const dateFormat = (value: string) =>
  new Intl.DateTimeFormat('nl-NL').format(new Date(value));

export function App(props: { rootUrl: string }) {
  return (
    <BrowserRouter basename={props.rootUrl}>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/search" exact render={() => <Search />} />
    </BrowserRouter>
  );
}

export default App;
