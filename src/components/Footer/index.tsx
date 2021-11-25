import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { suomifiDesignTokens, Paragraph } from 'suomifi-ui-components';
import Logo from '../Logo';

export default function Footer() {
  return (
    <Wrapper>
      <Top>
        <Link href="/">
          <Logo heading="Suomi.fi" />
        </Link>
      </Top>
      <Bottom>
        <Paragraph>
          Suomi.fi Design System -kirjaston kehittämisestä vastaa Digi-
          <br />
          ja väestötietovirasto.
        </Paragraph>
      </Bottom>
    </Wrapper>
  );
}
const Wrapper = styled.footer`
  padding: ${suomifiDesignTokens.spacing.s};
  background: ${suomifiDesignTokens.colors.whiteBase};
`;
const Top = styled.div`
  padding-top: ${suomifiDesignTokens.spacing.s};
`;
const Bottom = styled.div`
  padding: ${suomifiDesignTokens.spacing.l} 0;
`;
