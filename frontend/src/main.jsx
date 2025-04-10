import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/index.js';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Wrap the app with Provider */}
    <StrictMode>
      <Router> {/* Wrap the App component with Router */}
        <App />
      </Router>
    </StrictMode>
  </Provider>
);
