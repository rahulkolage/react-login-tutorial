import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProviderComponent } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProviderComponent>
        <App />
    </AuthContextProviderComponent>
);
