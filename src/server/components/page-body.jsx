import React from 'react';
import styled from 'react-emotion';
import Footer from './footer'
import { sharedProperties } from '../style/base'

const PageBodyContainer = styled('div')`
margin: auto;
margin-top: 40px;
width: ${sharedProperties.pageWidth}px;
display: flex;
min-height: calc(100vh - 100px);
flex-direction: column;
`

const BodyContent = styled('div')`
  flex: 1;
`

export default class PageBody extends React.Component {
  render() {
    return (
      <PageBodyContainer>
        <BodyContent>
          {this.props.children}
        </BodyContent>
        <Footer />
      </PageBodyContainer>
    )
  }
}
