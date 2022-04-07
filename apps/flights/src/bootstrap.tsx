import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <App rootUrl="/" />
  </StrictMode>,
  document.getElementById('root')
);
