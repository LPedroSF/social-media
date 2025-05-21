import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faComment, faHeart, faHouse, faGear, faMagnifyingGlass, faUser, faLightbulb} from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faHeart, faComment, faHouse, faGear, faMagnifyingGlass, faUser, faLightbulb);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider> 
  </React.StrictMode>
);