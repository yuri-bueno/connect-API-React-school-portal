import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import history from './services/history';

import store, { persistor } from './store';
import Header from './components/Header';
import GlobalStyle from './styles/GlobalStyles';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className='toast-container' />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
