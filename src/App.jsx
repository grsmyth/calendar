import React, { useState, useEffect } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Home from './Home';
import './styles/App.scss';

function App({ cookies }) {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState(cookies.get('goofy') || '');

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
      cookies.set('goofy', password, { path: '/' });
      return response.json();
    });
  };

  useEffect(() => {
    if (password !== '') tryLogin();
  }, []);

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

export default withCookies(App);

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};
