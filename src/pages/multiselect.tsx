import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'underscore';
import styled from 'styled-components';

import { Heading, MultiSelect, MultiSelectData } from 'suomifi-ui-components';

import multiSelectTools from '../data/multiSelectTools.json';

import store from '../redux/store';

interface FormState {
  formData: any;
  multiSelectSelectedValue: Array<MultiSelectDataCustom & MultiSelectData>;
}
interface MultiSelectDataCustom {
  name: string;
  price: number;
  tax: boolean;
}
const Wrapper = styled.div`
  padding-bottom: 20px;
`;
const multiSelectSelected = [
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
class MultiSelectForm extends React.Component<InjectedFormProps> {
  state: FormState = {
    formData: {},
    multiSelectSelectedValue: multiSelectSelected,
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
        <Heading variant="h1">Multi select</Heading>
        <Wrapper>
          <MultiSelect
            labelText="Useamman työkalun lainaus"
            hintText="Tällä kentällä voit valita useamman työkalun lainaukseen"
            items={multiSelectTools}
            chipListVisible={true}
            ariaChipActionLabel="Poista"
            removeAllButtonLabel="Poista kaikki valinnat"
            visualPlaceholder="Valitse työkalut"
            noItemsText="Ei valintoja"
            defaultSelectedItems={this.state.multiSelectSelectedValue}
            ariaSelectedAmountText="Valitut työkalut"
            ariaOptionsAvailableText="Vaihtoehdot"
            ariaOptionChipRemovedText="Poistetut"
            onItemSelectionsChange={(item) => {
              change(`multiSelectSelectedValue`, item);
            }}
          />
        </Wrapper>

        <Wrapper>
          <Heading variant="h2">Kaavakkeen tietosisällöt</Heading>
          {formData &&
            formData.multiSelectForm &&
            !formData.multiSelectForm.values && (
              <p>Kaavakkeelle ei ole syötetty tietoja</p>
            )}
          <pre>
            {JSON.stringify(
              formData &&
                formData.multiSelectForm &&
                formData.multiSelectForm.values,
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
  multiSelectSelectedValue: multiSelectSelected,
};
let InitializeFromStateFormMulti = reduxForm({
  form: 'multiSelectForm',
})(MultiSelectForm);

InitializeFromStateFormMulti = connect(() => ({
  initialValues: initialData,
}))(InitializeFromStateFormMulti);

export default InitializeFromStateFormMulti;
