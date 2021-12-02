import React from 'react';
import styled from 'styled-components';
import { Heading, suomifiDesignTokens } from 'suomifi-ui-components';
export default function Logo(props) {
  const { heading } = props;
  return (
    <Wrapper>
      <Item viewBox="0 0 32 32" version="1.1" aria-hidden>
        <title>Design System</title>
        <g stroke="none" fill="none" fillRule="evenodd">
          <g>
            <path
              d="M31,32 L1,32 C0.45,32 0,31.55 0,31 L0,1 C0,0.45 0.45,0 1,0 L31,0 C31.55,0 32,0.45 32,1 L32,31 C32,31.55 31.55,32 31,32 Z"
              fill="#00347A"
            ></path>
            <path
              d="M8.0008,12.0004 L8.0008,9.1434 C8.0008,8.5144 8.5148,8.0004 9.1438,8.0004 L12.0008,8.0004 L12.0008,12.0004"
              fill="#FFFFFF"
            ></path>
            <path
              d="M8,15.9996 L12,15.9996 L12,23.4666 C12,23.7596 11.743,23.9996 11.429,23.9996 L8.571,23.9996 C8.257,23.9996 8,23.7596 8,23.4666"
              fill="#FFFFFF"
            ></path>
            <path
              d="M16,8.0004 L23.429,8.0004 C23.743,8.0004 24,8.2574 24,8.5714 L24,12.0004 L16,12.0004"
              fill="#FFFFFF"
            ></path>
            <path
              d="M23.4286,19.9996 L15.9996,19.9996 L15.9996,15.9996 L23.9996,15.9996 L23.9996,19.4286 C23.9996,19.7436 23.7446,19.9996 23.4286,19.9996"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </Item>
      <Heading variant="h4" as="h2">
        {heading}
      </Heading>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  h2 {
    color: ${suomifiDesignTokens.colors.brandBase};
    margin: calc(${suomifiDesignTokens.spacing.xs} - 6px)
      ${suomifiDesignTokens.spacing.xs} 0 ${suomifiDesignTokens.spacing.xs};
  }
`;

const Item = styled.svg`
  height: 32px;
  display: block;
`;
