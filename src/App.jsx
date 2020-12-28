import React, { useState, useEffect } from 'react';
import Home from './Home';
import './styles/App.scss';

function App() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');

  const tryLogin = () => {
    const data = {
      secret: password,
    };
    // eslint-disable-next-line no-undef
    fetch('/.netlify/functions/checkAuth', {
      body: JSON.stringify(data),
      method: 'POST',
    }).then((response) => {
      setAuth(response.status === 200);
      console.log('returned', response.status);
      return response.json();
    });
  };

  const login = () => (
    <div className="loginContainer">
      <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
      <button type="button" onClick={tryLogin}>
        Login
      </button>
    </div>
  );
  return auth ? <Home /> : login();
}

export default App;
