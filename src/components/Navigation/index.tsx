import React from 'react';
import styled from 'styled-components';
import {
  StaticIcon,
  Heading,
  suomifiDesignTokens,
} from 'suomifi-ui-components';

import ActiveLink from '../ActiveLink';

export default function Navigation() {
  return (
    <Wrapper>
      <IconWrapper>
        <StaticIcon icon="puzzle" />
        <Heading variant="h4" as="h2">
          Esimerkit
        </Heading>
      </IconWrapper>
      <Nav>
        <List>
          <Item>
            <ActiveLink href="/">Home</ActiveLink>
          </Item>
          <Item>
            <ActiveLink href="/form">Form</ActiveLink>
          </Item>
          <Item>
            <ActiveLink href="/icons">Icons</ActiveLink>
          </Item>
        </List>
      </Nav>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 350px;
  margin-right: ${suomifiDesignTokens.spacing.s};
  h2 {
    margin: calc(${suomifiDesignTokens.spacing.xs} - 2px)
      ${suomifiDesignTokens.spacing.xs} ${suomifiDesignTokens.spacing.xs}
      ${suomifiDesignTokens.spacing.xs};
  }
`;
const IconWrapper = styled.div`
  font-size: 40px;
  line-height: 1em;
  padding: 10px;
  display: flex;
`;
const Nav = styled.nav`
  display: block;
`;
const List = styled.ul`
  display: block;
`;
const Item = styled.li`
  display: block;
  a {
    display: flex;
    justify-content: space-between;
    padding: 18px;
    border-bottom: 1px solid ${suomifiDesignTokens.colors.depthSecondary};
    color: ${suomifiDesignTokens.colors.highlightBase};
    text-decoration: none;
    text-transform: uppercase;
  }
  a.active {
    background: rgb(240, 246, 255);
    color: rgb(0, 53, 122);
    font-weight: 600;
    padding-left: 14px;

    border-left: 4px solid ${suomifiDesignTokens.colors.brandBase};
  }
`;
