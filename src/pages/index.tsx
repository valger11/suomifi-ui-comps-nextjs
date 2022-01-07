import React from 'react';
import styled from 'styled-components';
import DefaultLayout from '../ui/layouts/DefaultLayout';
import { Heading } from 'suomifi-ui-components';

export default function Landing() {
  return (
    <>
      <Heading variant="h1">Aloitussivu</Heading>
    </>
  );
}

Landing.Layout = DefaultLayout;
