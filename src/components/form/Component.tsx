import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import {
  Button,
  ToggleButton,
  RadioButton,
  RadioButtonGroup,
} from 'suomifi-ui-components';
import TextInputComponent from '../TextInputComponent';
interface IProps {
  message: string;
}

class UserForm extends React.Component<InjectedFormProps<IProps> & IProps> {
  constructor(props) {
    super(props);
    this.state = { oldEnough: false };
  }

  required = (value) => (value ? undefined : 'Required');

  handleSubmit(values: any) {
    console.log('values', values);
  }
  setOldEnough(value: any) {
    this.setState({
      oldEnough: value,
    });
  }

  render() {
    const { pristine, submitting, reset, message } = this.props;
    const { oldEnough } = this.state;
    const RadioField = ({ input, meta, ...rest }) => (
      <RadioButton {...input} {...rest} checked={input.value === rest.value} />
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <div>{message}</div>
        <div>
          <Field
            name="firstName"
            component={TextInputComponent}
            labelText="Syötä etunimi"
            type="text"
            visualPlaceholder="First Name"
            validate={this.required}
          />
        </div>
        <div>
          <Field
            name="lastName"
            component={TextInputComponent}
            labelText="Syötä sukunimi"
            type="text"
            visualPlaceholder="Last Name"
          />
        </div>
        <div>
          <ToggleButton onClick={(checked) => this.setOldEnough(checked)}>
            Unchecked enabled using button
          </ToggleButton>
        </div>
        <RadioButtonGroup
          labelText="RadioButtons in group"
          hintText="Example hint text"
          name="test-group"
          onChange={(value) => {
            console.log('value', value);
          }}
        >
          <Field
            name="features"
            component={RadioField}
            value="value-test-1"
            props={{ value: 'foo1' }}
          >
            {' '}
            Foo
          </Field>
          <Field
            name="features"
            component={RadioField}
            value="value-test-2"
            props={{ value: 'foo2' }}
          >
            {' '}
            Foo
          </Field>
          <Field
            name="features"
            component={RadioField}
            value="value-test-3"
            props={{ value: 'foo3' }}
          >
            {' '}
            Foo
          </Field>
          {/*
          <RadioButton ref={exampleRef1} value="value-test-1">
            Choice 1
          </RadioButton>
          <RadioButton ref={exampleRef2} value="value-test-2">
            Choice 2
          </RadioButton>
          <RadioButton ref={exampleRef3} value="value-test-3">
            Choice 3
          </RadioButton>
        */}
        </RadioButtonGroup>
        <div>
          <h2>How old you are?</h2>
          <Field
            name="correctAge"
            component={TextInputComponent}
            labelText="Age"
            type="text"
            visualPlaceholder="Insert age"
            disabled={!oldEnough}
          />
        </div>
        <div>
          <Field
            name="age"
            status="success"
            component={TextInputComponent}
            labelText="Age"
            type="text"
            visualPlaceholder="Insert age"
          />
        </div>
        <div>
          <Field
            name="age"
            status="error"
            component={TextInputComponent}
            labelText="Age"
            type="text"
            visualPlaceholder="Insert age"
          />
        </div>
        <div>
          <Field
            name="age"
            component={TextInputComponent}
            labelText="Age"
            type="text"
            visualPlaceholder="Insert age"
            fullWidth
          />
        </div>
        <div>
          <Field
            name="age"
            component={TextInputComponent}
            labelText="Age"
            type="text"
            visualPlaceholder="Insert age"
            wrapperProps={{ style: { width: '350px' } }}
          />
        </div>
        <div>
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            Clear Values
          </Button>
        </div>
      </form>
    );
  }
}

export default reduxForm<IProps>({
  form: 'userForm',
})(UserForm);
