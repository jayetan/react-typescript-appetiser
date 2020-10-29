import React, { ReactElement, useState } from 'react';

import AuthContainer from '../../components/AuthContainer';
import Input from '../../components/Input';
import { useHistory } from 'react-router-dom';
import { IErrorLoginResponse, onLogin } from '../../api';

function Login(): ReactElement {
  const history = useHistory();
  const [errors, setErrors] = useState(['']);

  const [{email, password}, setCredentials] = useState({
    email: '',
    password: '',
  });

  const login = async () => {
    const response = await onLogin(email, password);

    if (response.http_status === 200) {
      history.push('/dashboard');
    } else {
      const errorResponse = response as IErrorLoginResponse;
      const { errors } = errorResponse;
      const errorsArray: string[] = errors ? Object.entries(errors).map(([_key, value]) => value) : [errorResponse.message];
      setErrors(errorsArray);
    }
  }

  return (
    <AuthContainer
      title="Welcome Back"
      buttonOneName="Sign up"
      buttonTwoName="Login"
      buttonLink="/signup"
      buttonAction={login}
      errors={errors}
    >
      <Input
        label='Email'
        type='email'
        placeholder='Enter your email'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          email: event.target.value,
          password
        })}
        required
      />
      <Input
        label='Password'
        type='password'
        placeholder='Type in Password'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          email,
          password: event.target.value,
        })}
        required
      />
    </AuthContainer>
  );
}

export default Login;