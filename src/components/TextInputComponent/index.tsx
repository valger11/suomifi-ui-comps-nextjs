import React from 'react';

import { TextInput } from 'suomifi-ui-components';
type PropTypes = {
  name: string;
  labelText: string;
  visualPlaceholder?: string;
  disabled?: boolean;
  status: string;
  meta: any;
  input: any;
  fullWidth: boolean;
  wrapperProps: any;
};
const TextInputComponent: React.FC<PropTypes> = ({
  labelText,
  visualPlaceholder,
  name,
  disabled,
  status,
  meta: { touched, invalid, error },
  input,
  fullWidth,
  wrapperProps,
}) => {
  return (
    <TextInput
      name={name}
      labelText={labelText}
      visualPlaceholder={visualPlaceholder}
      // error={touched && invalid}
      // helperText={touched && error}
      status={status}
      disabled={disabled}
      fullWidth={fullWidth}
      wrapperProps={wrapperProps}
      {...input}
    />
  );
};
export default TextInputComponent;
