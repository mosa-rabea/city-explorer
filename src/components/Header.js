import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

export default class Header extends Component {
  render() {
    const { submitHan } = this.props;
    return (
      <header>
        <Container>
          <Row>
           <h1>City Explorer</h1>
            <Col>
            </Col>
            <Col>
              <form id='form' onSubmit={(e) => submitHan(e)}>
                <input
                  name='searchText'
                  type='text'
                  placeholder='Search By City Name'
                />
                <input type='submit' value='Search' />
              </form>
            </Col>
          </Row>
        </Container>
      </header>
    );
  }
}
