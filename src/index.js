import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
    typography: {
          fontFamily: "'Roboto Mono', monospace",
        },
});
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
          <ThemeProvider theme={theme}>
                  <App />
                </ThemeProvider>
        </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();

