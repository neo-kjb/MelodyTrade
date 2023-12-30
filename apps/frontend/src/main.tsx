import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { Provider } from 'react-redux';
import { store } from './store';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
