import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IErrorLoginResponse, onSignUp } from '../../api';

import AuthContainer from '../../components/AuthContainer';
import Input from '../../components/Input';

function SignUp(): ReactElement {
  const history = useHistory();
  const [errors, setErrors] = useState(['']);
  const [{email, password, full_name, password_confirmation}, setCredentials] = useState({
    email: '',
    password: '',
    full_name: '',
    password_confirmation: '',
  });

  const signup = async () => {
    const response = await onSignUp(email, full_name, password, password_confirmation);

    if (response.http_status === 200) {
      history.push('/verify');
    } else {
      const errorResponse = response as IErrorLoginResponse;
      const { errors } = errorResponse;
      const errorsArray: string[] = errors ? Object.entries(errors).map(([_key, value]) => value) : [errorResponse.message];
      setErrors(errorsArray);
    }
  }

  return (
    <AuthContainer
      title="New Account"
      buttonOneName="Back"
      buttonTwoName="Sign up"
      buttonLink="/"
      buttonAction={signup}
      errors={errors}
    >
      <Input
        label='Email'
        type='email'
        placeholder='Enter your email'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          password,
          full_name,
          password_confirmation,
          email: event.target.value,
        })}
      />
      <Input
        label='Full Name'
        type='text'
        placeholder='Enter your fullname'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          email,
          password,
          password_confirmation,
          full_name: event.target.value,
        })}
      />
      <Input
        label='Password'
        type='password'
        placeholder='Type in Password'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          password: event.target.value,
          email,
          password_confirmation,
          full_name,
        })}
      />
      <Input
        label='Confirm Password'
        type='password'
        placeholder='Confirm Password'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCredentials({
          password_confirmation: event.target.value,
          email,
          password,
          full_name,
        })}
      />
    </AuthContainer>
  );
}

export default SignUp;