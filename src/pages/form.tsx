import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'underscore';
import styled from 'styled-components';

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
const Wrapper = styled.div`
  padding-bottom: 20px;
`;
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
  onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
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

    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <Button
            onClick={() => {
              _(this.alertVisibleFunc).delay(4000);
            }}
          >
            Viiv??st?? Alert nelj??ksi sekunniksi
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
            Ensi maanantaina on huoltokatko
          </Alert>
        )}
        <div style={{ marginBottom: '10px' }}>
          <Button
            onClick={() => {
              _(this.inlineAlertVisibleFunc).delay(4000);
            }}
          >
            Viiv??st?? Inline Alert nelj??ksi sekunniksi
          </Button>
        </div>
        {inlineAlertVisible && (
          <InlineAlert style={{ marginBottom: '10px' }}>
            Nyt voit sy??tt???? tiedot
          </InlineAlert>
        )}
        <Heading variant="h1">Ty??kalujen lainaajan tiedot</Heading>
        <Wrapper>
          <Field
            name="firstName"
            component={TextInputComponent}
            labelText="Etunimi"
            type="text"
            visualPlaceholder="Sy??t?? etunimesi"
            validate={this.required}
          />
        </Wrapper>
        <Wrapper>
          <Field
            name="lastName"
            component={TextInputComponent}
            labelText="Sukunimi"
            type="text"
            visualPlaceholder="Sy??t?? sukunimesi"
          />
        </Wrapper>
        <Wrapper>
          <Field
            name="rentDuration"
            component={RadioField}
            props={{ value: '1week' }}
          >
            Lainaan viikoksi
          </Field>
          <Field
            name="rentDuration"
            component={RadioField}
            props={{ value: '2week' }}
          >
            Lainaan kahdeksi viikoksi
          </Field>
          <Field
            name="rentDuration"
            component={RadioField}
            props={{ value: '3weeks' }}
          >
            Lainaan kolmeksi viikoksi
          </Field>
        </Wrapper>

        <Heading variant="h2">Ik??si</Heading>
        <Wrapper>
          <ToggleButton onClick={(checked) => this.setOldEnough(checked)}>
            Oletko yli 18-vuotias
          </ToggleButton>
        </Wrapper>
        <Wrapper>
          <Field
            name="correctAge"
            component={TextInputComponent}
            labelText="Ik??si"
            type="text"
            visualPlaceholder="Sy??t?? ik??si"
            disabled={!oldEnough}
          />
        </Wrapper>
        <Wrapper>
          <SingleSelect
            labelText="Jos haluat lainata vain yhden ty??kalun"
            hintText="El?? varaa t??ll?? kent??ll??, jos haluat varata useamman ty??kalun"
            clearButtonLabel="Tyhjenn?? valinta"
            items={singleSelectTools}
            visualPlaceholder="Valitse ty??kalu"
            noItemsText="hakuehdoilla ei l??ytynyt osumia"
            defaultSelectedItem={this.state.selectedValue}
            ariaOptionsAvailableText="Vaihtoehdot"
            onItemSelectionChange={(item: any) => {
              this.setSelectedValue(item);
              change(`singleSelectVal`, item);
            }}
            status={this.state.toolsStatus}
            statusText={
              this.state.toolsStatus === 'error'
                ? 'Sinun tulee valita ty??kalu.'
                : ''
            }
          />
        </Wrapper>
        <Block margin="m">
          <MultiSelect
            labelText="Useamman ty??kalun lainaus"
            hintText="T??ll?? kent??ll?? voit valita useamman ty??kalun lainaukseen"
            items={multiSelectTools}
            chipListVisible={true}
            ariaChipActionLabel="Poista"
            removeAllButtonLabel="Poista kaikki valinnat"
            visualPlaceholder="Valitse ty??kalut"
            noItemsText="Ei valintoja"
            defaultSelectedItems={this.state.multiSelectSelectedValue}
            ariaSelectedAmountText="Valitut ty??kalut"
            ariaOptionsAvailableText="Vaihtoehdot"
            ariaOptionChipRemovedText="Poistetut"
            onItemSelectionsChange={(item) => {
              change(`multiSelectVal`, item);
            }}
          />
        </Block>
        <Wrapper>
          <Field
            name="notes"
            hintText="Sy??t??lis??tietoja liittyen lainaukseen"
            labelText="Lis??tiedot"
            component={TextareaComponent}
          />
        </Wrapper>
        <Wrapper>
          <Button
            type="submit"
            disabled={pristine || submitting}
            style={{ marginRight: '10px' }}
          >
            Submit
          </Button>
          <Button type="button" variant="secondary" onClick={reset}>
            Clear Values
          </Button>
        </Wrapper>
        <Wrapper>
          <Heading variant="h2">Kaavakkeen tietosis??ll??t</Heading>
          {formData && formData.toolsForm && !formData.toolsForm.values && (
            <p>Kaavakkeelle ei ole sy??tetty tietoja</p>
          )}
          <pre>
            {JSON.stringify(
              formData && formData.toolsForm && formData.toolsForm.values,
              null,
              2
            )}
          </pre>
        </Wrapper>
      </form>
    );
  }
}
const initialData = {
  firstName: 'Pertti',
  lastName: 'Maatinen',
  singleSelectVal: '',
  notes: 'Lis??tietoja',
};
let InitializeFromStateForm = reduxForm({
  form: 'toolsForm',
})(ToolsForm);

InitializeFromStateForm = connect(() => ({
  initialValues: initialData,
}))(InitializeFromStateForm);

export default InitializeFromStateForm;
