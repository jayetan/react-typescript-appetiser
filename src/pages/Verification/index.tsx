import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IErrorLoginResponse, onVerify } from '../../api';

import AuthContainer from '../../components/AuthContainer';
import Input from '../../components/Input';

function Verification(): ReactElement {
  const history = useHistory();
  const [errors, setErrors] = useState(['']);
  const [{code, email}, setCode] = useState({
    code: '',
    email: '',
  });

  const verify = async () => {
    const response = await onVerify(code, email);
    console.log(response);

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
      title="Verify Email"
      buttonOneName="Back"
      buttonTwoName="Verify"
      buttonLink="/"
      buttonAction={verify}
      errors={errors}
    >
      <Input
        label='Verification Code'
        type='text'
        placeholder='Enter Code'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCode({
          email,
          code: event.target.value,
        })}
      />

      <Input
        label='Email'
        type='text'
        placeholder='Enter Code'
        onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => setCode({
          code,
          email: event.target.value,
        })}
      />
    </AuthContainer>
  );
}

export default Verification;