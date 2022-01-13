import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'underscore';
import {
  Block,
  Button,
  ToggleButton,
  RadioButton,
  Heading,
  Alert,
  InlineAlert,
  SingleSelect,
  MultiSelect,
  MultiSelectData,
  SingleSelectData,
  SingleSelectStatus,
} from 'suomifi-ui-components';

import singleSelectTools from '../data/singleSelectTools.json';
import multiSelectTools from '../data/multiSelectTools.json';
import TextInputComponent from '../components/TextInputComponent';
import TextareaComponent from '../components/TextareaComponent';

import store from '../redux/store';

interface FormState {
  oldEnough: boolean;
  formData: any;
  alertVisible: boolean;
  inlineAlertVisible: boolean;
  toolsStatus: SingleSelectStatus;
  selectedValue: SingleSelectDataCustom;
  multiSelectSelectedValue: Array<MultiSelectDataCustom & MultiSelectData>;
}
interface SingleSelectDataCustom extends SingleSelectData {
  name: string;
  price: number;
  tax: boolean;
}
interface MultiSelectDataCustom {
  name: string;
  price: number;
  tax: boolean;
}
class ToolsForm extends React.Component<InjectedFormProps> {
  state: FormState = {
    toolsStatus: 'default',
    formData: {},
    oldEnough: false,
    alertVisible: false,
    inlineAlertVisible: false,
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

  constructor(props: InjectedFormProps) {
    super(props);

    store.subscribe(() => {
      this.setState({
        formData: store.getState().form,
      });
    });
  }

  required = (value: string) => (value ? undefined : 'Required');

  handleSubmit(values: any) {
    console.log('values', values);
  }
  setOldEnough(value: any) {
    this.setState({
      oldEnough: value,
    });
  }
  setSelectedValue = (value: SingleSelectDataCustom) => {
    this.setState({
      selectedValue: value,
    });
  };
  setToolsStatus = (value: SingleSelectStatus) => {
    this.setState({
      toolsStatus: value,
    });
  };
  alertVisibleFunc = () => {
    this.setState({
      alertVisible: true,
    });
  };
  closeAlert = () => {
    this.setState({
      alertVisible: false,
    });
  };
  inlineAlertVisibleFunc = () => {
    this.setState({
      inlineAlertVisible: true,
    });
  };

  render() {
    const { pristine, submitting, reset, change } = this.props;
    const {
      oldEnough,
      formData,
      alertVisible,
      inlineAlertVisible,
    } = this.state;

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
    const RadioField = (props: any) => {
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
        <div style={{ marginBottom: '10px' }}>
          <Button
            onClick={() => {
              _(this.alertVisibleFunc).delay(4000);
            }}
          >
            Delay alert for 4 seconds
          </Button>
        </div>

        {alertVisible && (
          <Alert
            closeText="close"
            onClick={() => {
              this.closeAlert();
            }}
            style={{ marginBottom: '10px' }}
          >
            There is maintenance break next monday
          </Alert>
        )}
        <div style={{ marginBottom: '10px' }}>
          <Button
            onClick={() => {
              _(this.inlineAlertVisibleFunc).delay(4000);
            }}
          >
            Delay inline alert for 4 seconds
          </Button>
        </div>
        {inlineAlertVisible && (
          <InlineAlert style={{ marginBottom: '10px' }}>
            Now you can fill information in form
          </InlineAlert>
        )}
        <Heading variant="h1">Testauslomake</Heading>
        <Block margin="m">
          <SingleSelect
            labelText="SingleSelect Tool"
            hintText="You can filter options by typing in the field"
            clearButtonLabel="Clear selection"
            items={singleSelectTools}
            visualPlaceholder="Choose a tool"
            noItemsText="No matching options"
            defaultSelectedItem={this.state.selectedValue}
            ariaOptionsAvailableText="Options available"
            onItemSelectionChange={(item: any) => {
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
        <Field
          name="notes"
          hintText="Example hint text"
          labelText="Textarea with hint and optional texts"
          component={TextareaComponent}
        />
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
  notes: 'Notes',
};
let InitializeFromStateForm = reduxForm({
  form: 'toolsForm',
})(ToolsForm);

InitializeFromStateForm = connect(() => ({
  initialValues: initialData,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
