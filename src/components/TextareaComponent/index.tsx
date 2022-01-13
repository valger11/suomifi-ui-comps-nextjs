import React from 'react';

import { Textarea } from 'suomifi-ui-components';
type PropTypes = {
  name: string;
  labelText: string;
  hintText?: string;
  visualPlaceholder?: string;
  disabled?: boolean;
  status: string;
  meta: any;
  input: any;
  fullWidth: boolean;
  wrapperProps: any;
};
const TextareaComponent: React.FC<PropTypes> = ({
  labelText,
  visualPlaceholder,
  name,
  disabled,
  status,
  hintText,
  meta: { touched, invalid, error },
  input,
}) => {
  return (
    <Textarea
      name={name}
      labelText={labelText}
      hintText={hintText}
      visualPlaceholder={visualPlaceholder}
      // error={touched && invalid}
      // helperText={touched && error}
      status={status}
      disabled={disabled}
      {...input}
    />
  );
};
export default TextareaComponent;
