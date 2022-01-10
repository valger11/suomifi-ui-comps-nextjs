import React from 'react';
import { AppProps } from 'next/app';
import styled from 'styled-components';
import { suomifiDesignTokens } from 'suomifi-ui-components';

import { createGlobalStyle } from 'styled-components';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';
import store from '../redux/store';

import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
interface MyAppProps extends AppProps {
  Component: {
    Layout?: React.ExoticComponent<{
      children?: React.ReactNode;
    }>;
  } & NextComponentType<NextPageContext, any, {}>;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || React.Fragment;

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Layout>
        <Container>
          <Header />
          <ContentWrapper>
            <NavAndContent>
              <Navigation />
              <Main>
                <Component {...pageProps} />
              </Main>
            </NavAndContent>
          </ContentWrapper>
          <Footer />
        </Container>
      </Layout>
    </Provider>
  );
}
const Container = styled.div`
  background: ${suomifiDesignTokens.colors.depthLight3};
`;
const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
`;
const NavAndContent = styled.div`
  border: 1px solid ${suomifiDesignTokens.colors.depthLight1};
  background: ${suomifiDesignTokens.colors.whiteBase};
  display: flex;
  flex-grow: 1;
  margin: 30px 30px 60px 30px;
  flex-wrap: nowrap;
  // overflow: hidden;
`;
const Main = styled.main`
  margin: ${suomifiDesignTokens.spacing.s};
  flex: 1;
`;

// Reset default browser styling
const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    min-height: 100vh;
  }

  body {
    min-height: 100vh;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  #__next {
    min-height: 100vh;
  }
`;
