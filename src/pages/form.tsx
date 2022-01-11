import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  Block,
  Button,
  ToggleButton,
  RadioButton,
  Heading,
  InlineAlert,
  SingleSelect,
  MultiSelect,
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
    this.state = { status: 'Default' };

    this.state = {
      selectedValue: {
        name: 'Hammer',
        price: 15,
        tax: true,
        labelText: 'Hammer',
        uniqueItemId: 'h9823523',
      },
      multiSelectSelectedValue: [
        {
          name: 'Hammer',
          price: 15,
          tax: true,
          labelText: 'Hammer',
          uniqueItemId: 'h9823523',
        },
        {
          name: 'Powersaw',
          price: 150,
          tax: false,
          labelText: 'Powersaw',
          disabled: true,
          uniqueItemId: 'ps9081231',
        },
      ],
    };

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
  setSelectedValue = (value) => {
    this.setState({
      selectedValue: value,
    });
  };
  setToolsStatus = (value) => {
    this.setState({
      toolsStatus: value,
    });
  };
  render() {
    const { pristine, submitting, reset, message, change } = this.props;
    const { oldEnough, formData } = this.state;
    const tools = [
      {
        name: 'Jackhammer',
        price: 230,
        tax: false,
        labelText: 'Jackhammer',
        uniqueItemId: 'jh2435626',
      },
      {
        name: 'Hammer',
        price: 15,
        tax: true,
        labelText: 'Hammer',
        uniqueItemId: 'h9823523',
      },
      {
        name: 'Sledgehammer',
        price: 36,
        tax: false,
        labelText: 'Sledgehammer',
        uniqueItemId: 'sh908293482',
      },
      {
        name: 'Spade',
        price: 50,
        tax: true,
        labelText: 'Spade',
        uniqueItemId: 's82502335',
      },
      {
        name: 'Powersaw',
        price: 150,
        tax: false,
        labelText: 'Powersaw',
        disabled: true,
        uniqueItemId: 'ps9081231',
      },
      {
        name: 'Shovel',
        price: 115,
        tax: true,
        labelText: 'Shovel',
        uniqueItemId: 's05111511',
      },
      {
        name: 'Iron stick',
        price: 85,
        tax: false,
        labelText: 'Iron stick',
        uniqueItemId: 'is3451261',
      },
      {
        name: 'Rake',
        price: 50,
        tax: true,
        labelText: 'Rake',
        uniqueItemId: 'r09282626',
      },
      {
        name: 'Motorsaw',
        price: 450,
        tax: false,
        labelText: 'Motorsaw',
        disabled: true,
        uniqueItemId: 'ms6126266',
      },
    ];
    const multiSelectTools = [
      {
        name: 'Jackhammer',
        price: 230,
        tax: false,
        labelText: 'Jackhammer',
        uniqueItemId: 'jh2435626',
      },
      {
        name: 'Hammer',
        price: 15,
        tax: true,
        labelText: 'Hammer',
        uniqueItemId: 'h9823523',
      },
      {
        name: 'Sledgehammer',
        price: 36,
        tax: false,
        labelText: 'Sledgehammer',
        uniqueItemId: 'sh908293482',
      },
      {
        name: 'Spade',
        price: 50,
        tax: true,
        labelText: 'Spade',
        uniqueItemId: 's82502335',
      },
      {
        name: 'Powersaw',
        price: 150,
        tax: false,
        labelText: 'Powersaw',
        disabled: true,
        uniqueItemId: 'ps9081231',
      },
      {
        name: 'Shovel',
        price: 115,
        tax: true,
        labelText: 'Shovel',
        uniqueItemId: 's05111511',
      },
      {
        name: 'Iron stick',
        price: 85,
        tax: false,
        labelText: 'Iron stick',
        uniqueItemId: 'is3451261',
      },
      {
        name: 'Rake',
        price: 50,
        tax: true,
        labelText: 'Rake',
        uniqueItemId: 'r09282626',
      },
      {
        name: 'Motorsaw',
        price: 450,
        tax: false,
        labelText: 'Motorsaw',
        disabled: true,
        uniqueItemId: 'ms6126266',
      },
    ];

    const defaultSelectedTools = [
      {
        name: 'Hammer',
        price: 15,
        tax: true,
        labelText: 'Hammer',
        uniqueItemId: 'h9823523',
      },
      {
        name: 'Powersaw',
        price: 150,
        tax: false,
        labelText: 'Powersaw',
        disabled: true,
        uniqueItemId: 'ps9081231',
      },
    ];
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
        <InlineAlert>Now you can fill information in form</InlineAlert>
        <Heading variant="h1">Testauslomake</Heading>

        <div>{message}</div>
        <Block margin="m">
          <SingleSelect
            labelText="SingleSelect Tool"
            hintText="You can filter options by typing in the field"
            clearButtonLabel="Clear selection"
            items={tools}
            visualPlaceholder="Choose a tool"
            noItemsText="No matching options"
            defaultSelectedItem={this.state.selectedValue}
            ariaOptionsAvailableText="Options available"
            onItemSelectionChange={(item) => {
              this.setSelectedValue(item);
              change(`singleSelectVal`, item);
            }}
            onChange={(event) => console.log('event', event)}
            status={this.state.toolsStatus}
            statusText={
              this.state.toolsStatus === 'error'
                ? 'You must select a tool.'
                : ''
            }
          />
        </Block>
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

        <Block margin="m">
          <MultiSelect
            name="multiSelect"
            labelText="MultiSelect Tools"
            hintText="You can filter options by typing in the field"
            items={multiSelectTools}
            chipListVisible={true}
            ariaChipActionLabel="Remove"
            removeAllButtonLabel="Remove all selections"
            visualPlaceholder="Choose your tools"
            noItemsText="No items"
            defaultSelectedItems={this.state.multiSelectSelectedValue}
            ariaSelectedAmountText="tools selected"
            ariaOptionsAvailableText="options available"
            ariaOptionChipRemovedText="removed"
            onItemSelectionsChange={(item) => {
              console.log('item', item);
              //this.setSelectedValue(item);
              change(`multiSelectVal`, item);
            }}
          />
        </Block>
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
  singleSelectVal: '',
};
let InitializeFromStateForm = reduxForm({
  form: 'userForm',
})(UserForm);

InitializeFromStateForm = connect((state) => ({
  initialValues: initialData,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
