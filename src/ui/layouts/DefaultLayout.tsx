import React from 'react';
import styled from 'styled-components';

export default function DefaultLayout(props) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    color: red;
  }
`;
