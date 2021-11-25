import React from 'react';
import styled from 'styled-components';
import DefaultLayout from '../ui/layouts/DefaultLayout';
import { Heading } from 'suomifi-ui-components';

export default function Landing() {
  return <Heading variant="h1">Aloitussivu</Heading>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(247, 247, 248);
  form {
    width: 500px;
  }
`;

Landing.Layout = DefaultLayout;
