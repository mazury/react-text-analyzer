import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const AppClient = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

ReactDOM.render(<AppClient />, document.getElementById('main'));
// registerServiceWorker();
