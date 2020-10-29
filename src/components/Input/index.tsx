import React, { ReactElement } from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
  label: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  required?: boolean;
}

function Input(props: IProps): ReactElement {
  const { label, onInputChange, placeholder, type } = props;

  return (
    <TextField
      label={label}
      type={type}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder={placeholder}
      margin="normal"
      onChange={onInputChange}
      required
    />
  );
}

export default Input;
