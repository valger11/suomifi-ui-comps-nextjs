import React from 'react';
import styled from 'styled-components';
import { Heading } from 'suomifi-ui-components';
import { baseIcons, SuomifiIcon } from 'suomifi-icons';
const StyledSuomifiIcon = styled(
  ({ ariaLabel, mousePointer, className, ...passProps }: any) => (
    <SuomifiIcon {...passProps} />
  )
)``;
export default function icons() {
  return (
    <>
      <Heading variant="h1">Ikonisivu</Heading>
      <Container>
        {baseIcons.map((icon) => (
          <span key={icon}>
            <StyledIcon>
              <StyledSuomifiIcon icon={icon} />
              <figcaption>{icon}</figcaption>
            </StyledIcon>
          </span>
        ))}
      </Container>
    </>
  );
}
const StyledIcon = styled.div`
  width: 150px;
  display: inline-block;
  margin-bottom: 20px;
  text-align: center;
  svg {
    height: 50px;
    width: auto;
    display: inline-block;
    margin-bottom: 7px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin-top: 10px;
  background: rgb(247, 247, 248);
`;
