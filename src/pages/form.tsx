import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  Button,
  ToggleButton,
  RadioButton,
  RadioButtonGroup,
  Heading,
} from 'suomifi-ui-components';
import TextInputComponent from '../components/TextInputComponent';
import store from '../redux/store';
interface IProps {
  message: string;
}

class UserForm extends React.Component<InjectedFormProps<IProps> & IProps> {
  constructor(props) {
    super(props);
    this.state = { oldEnough: false };

    store.subscribe(() => {
      this.setState({
        formData: store.getState().form,
      });
    });
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
    const { oldEnough, formData } = this.state;
    const RadioField = (props) => {
      const { children, ...field } = props;

      return (
        <RadioButton
          name={field.input.name}
          value={field.value}
          onChange={(event) => field.input.onChange(event)}
          checked={field.input.value === field.value}
        >
          {children}
        </RadioButton>
      );
    };
    const customWidthVal =
      formData &&
      formData.userForm &&
      formData.userForm.values &&
      formData.userForm.values.customWidth;
    const selectedStatus =
      formData &&
      formData.userForm &&
      formData.userForm.values &&
      formData.userForm.values.status;

    return (
      <form onSubmit={this.handleSubmit}>
        <Heading variant="h1">Testauslomake</Heading>
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
            Ota kenttä päälle tai pois päältä
          </ToggleButton>
        </div>

        <Field
          name="status"
          id="first"
          component={RadioField}
          props={{ value: 'default' }}
        >
          Normaali
        </Field>
        <Field
          name="status"
          id="second"
          component={RadioField}
          props={{ value: 'success' }}
        >
          Onnistunut
        </Field>
        <Field
          name="status"
          id="third"
          component={RadioField}
          props={{ value: 'error' }}
        >
          Virhetilanne
        </Field>

        <div>
          <Heading variant="h2">Kuinka vanha olet</Heading>
          <Field
            name="correctAge"
            component={TextInputComponent}
            labelText="Ikäsi"
            type="text"
            visualPlaceholder="Syötä ikäsi"
            disabled={!oldEnough}
            status={selectedStatus}
          />
        </div>
        <div>
          <Field
            name="fullWidth"
            component={TextInputComponent}
            labelText="Täysleveä kenttä"
            type="text"
            fullWidth
          />
        </div>
        <div>
          <Field
            name="customWidth"
            component={TextInputComponent}
            labelText="vapaasti määriteltävä leveys"
            type="text"
            visualPlaceholder="syötä kentän leveys"
            wrapperProps={{ style: { width: customWidthVal + 'px' } }}
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
        <Heading variant="h2">Kaavakkeen tietosisällöt</Heading>
        {formData && formData.userForm && !formData.userForm.values && (
          <p>Kaavakkeelle ei ole syötetty tietoja</p>
        )}
        <pre>
          {JSON.stringify(
            formData && formData.userForm && formData.userForm.values,
            null,
            2
          )}
        </pre>
      </form>
    );
  }
}
const initialData = {
  firstName: 'Pertti',
  lastName: 'Maatinen',
  customWidth: 200,
};
let InitializeFromStateForm = reduxForm({
  form: 'userForm',
})(UserForm);

InitializeFromStateForm = connect((state) => ({
  initialValues: initialData,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
