import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { suomifiDesignTokens } from 'suomifi-ui-components';
import Logo from '../Logo';

export default function Header() {
  return (
    <Wrapper>
      <Link href="/">
        <a>
          <Logo heading="Design System Testaussivu" />
        </a>
      </Link>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: ${suomifiDesignTokens.spacing.s};
  border-top: 4px solid ${suomifiDesignTokens.colors.brandBase};
  box-sizing: border-box;
  background: ${suomifiDesignTokens.colors.whiteBase};
  border-bottom: 1px solid ${suomifiDesignTokens.colors.depthLight1};
  display: flex;
`;
