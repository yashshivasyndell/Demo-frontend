import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import {Store,persistor} from './redux/store/Store.js'; 
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme();
createRoot(document.getElementById('root')).render(
  <>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
);
