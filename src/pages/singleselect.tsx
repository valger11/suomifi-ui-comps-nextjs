import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'underscore';
import styled from 'styled-components';

import {
  Heading,
  SingleSelect,
  SingleSelectStatus,
} from 'suomifi-ui-components';

import singleSelectTools from '../data/singleSelectTools.json';

import store from '../redux/store';

interface FormState {
  formData: any;
  toolsStatus: SingleSelectStatus;
}
const Wrapper = styled.div`
  padding-bottom: 20px;
`;
const selectedValue = {
  name: 'Hammer',
  price: 15,
  tax: true,
  labelText: 'Hammer',
  uniqueItemId: 'h9823523',
};
class SingleSelectForm extends React.Component<InjectedFormProps> {
  state: FormState = {
    formData: {},
    toolsStatus: 'default',
  };

  constructor(props: InjectedFormProps) {
    super(props);

    store.subscribe(() => {
      this.setState({
        formData: store.getState().form,
      });
    });
  }
  componentDidMount() {
    this.setState({
      formData: store.getState().form,
    });
  }
  setToolsStatus = (value: SingleSelectStatus) => {
    this.setState({
      toolsStatus: value,
    });
  };
  handleSubmit(values: any) {
    console.log('values', values);
  }
  onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  render() {
    const { change } = this.props;
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit} onKeyPress={this.onKeyPress}>
        <Heading variant="h1">Single select</Heading>
        <Wrapper>
          <SingleSelect
            labelText="Jos haluat lainata vain yhden työkalun"
            hintText="Elä varaa tällä kentällä, jos haluat varata useamman työkalun"
            clearButtonLabel="Tyhjennä valinta"
            items={singleSelectTools}
            visualPlaceholder="Valitse työkalu"
            noItemsText="hakuehdoilla ei löytynyt osumia"
            defaultSelectedItem={selectedValue}
            ariaOptionsAvailableText="Vaihtoehdot"
            onItemSelectionChange={(item: any) => {
              this.setToolsStatus(item);
              change(`singleSelectSelectedValue`, item);
            }}
            status={this.state.toolsStatus}
            statusText={
              this.state.toolsStatus === 'error'
                ? 'Sinun tulee valita työkalu.'
                : ''
            }
          />
        </Wrapper>

        <Wrapper>
          <Heading variant="h2">Kaavakkeen tietosisällöt</Heading>
          {formData &&
            formData.singleSelectForm &&
            !formData.singleSelectForm.values && (
              <p>Kaavakkeelle ei ole syötetty tietoja</p>
            )}
          <pre>
            {JSON.stringify(
              formData &&
                formData.singleSelectForm &&
                formData.singleSelectForm.values,
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
  singleSelectSelectedValue: selectedValue,
};
let InitializeFromStateFormSingle = reduxForm({
  form: 'singleSelectForm',
})(SingleSelectForm);

InitializeFromStateFormSingle = connect(() => ({
  initialValues: initialData,
}))(InitializeFromStateFormSingle);

export default InitializeFromStateFormSingle;
