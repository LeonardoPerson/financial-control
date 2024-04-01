import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addUser } from '../redux/actions';
import { emailValidationTest, passwordValidationTest } from '../utils';
import './Login.css';

function Login() {
  const [newEmail, setNewEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [warningEmail, setWarningEmail] = useState(false);
  const [warningPassword, setWarningPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [authorizedLogin, setAuthorizedLogin] = useState(false);
  const dispatch = useDispatch();
  const classWarningEmail = `${warningEmail ? 'show-warning warning-field hide-warning' : 'hide-warning'}`;
  const classWarningPassword = `${warningPassword ? 'show-warning warning-field hide-warning' : 'hide-warning'}`;

  const handleNewEmail = (value: string) => {
    setNewEmail(value);
    const emailVerification = emailValidationTest(value);
    setValidEmail(emailVerification);
    setWarningEmail(false);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
    const passwordVerification = passwordValidationTest(value);
    setValidPassword(passwordVerification);
    setWarningPassword(false);
  };

  const handleLogin = () => {
    if (!validEmail) {
      setWarningEmail(true);
    }
    if (!validPassword) {
      setWarningPassword(true);
    }
    const goToWallet = validEmail && validPassword;
    if (goToWallet) {
      dispatch(addUser(newEmail));
      setAuthorizedLogin(goToWallet);
      //armazenar email e senha no localstorage
      localStorage.setItem("financial-control-login", newEmail);
    }
  };
 
  return (
    <div>
      <form className="form-login">
        <div className="item-login input-field">
          <TextField
            className="field-login"
            type="email"
            label="Email"
            value={newEmail}
            onChange={(event) => handleNewEmail(event.target.value)}
            inputProps={{ 'data-testid': 'email-input' }}
          />
          <div className={classWarningEmail}>Formato de email inválido.</div>
        </div>
        <div className="item-login input-field">
          <TextField
            className="field-login"
            type="password"
            label="Senha"
            value={password}
            onChange={(event) => handlePassword(event.target.value)}
            inputProps={{ 'data-testid': 'password-input' }}
          />
          <div className={classWarningPassword}>A senha deve possuir 6 caracteres e uma letra maiúscula</div>
        </div>
        <div className="item-login">
          <Button
            className="field-login"
            data-testid="login-button"
            variant="contained"
            disabled={authorizedLogin}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </div>
      </form>
      {authorizedLogin && <Navigate to="/carteira" />}
    </div>
  );
}

export default Login;
