import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Form, Row, Col } from 'react-bootstrap';
import DisplayHolidays from './displayholidays';
import '../styles/scss/app.scss';
import DisplayNavs from './nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { country: '', month: '', holidays: { statusCode: 0, data: [] } };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  handleMonthChange(event) {
    this.setState({ month: event.target.value });
  }

  handleSubmit(event) {
    const { country, month } = this.state;
    const api = `https://holsfinderapi.herokuapp.com/api/v1/holidays/${country}/${month}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          holidays: data
        });
      });

    event.preventDefault();
  }

  render() {
    const {
      holidays, country, month
    } = this.state;

    return (
      <div>
        <DisplayNavs />
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" value={country} onChange={this.handleCountryChange} placeholder="Enter country" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Month</Form.Label>
                  <Form.Control type="text" value={month} onChange={this.handleMonthChange} placeholder="Enter month" />
                </Form.Group> 
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={{ span: 4, offset: 2 }} md={{ span: 4, offset: 0 }}>
                <Form.Control className="display" type="submit" value="Get Holidays" />
              </Col>
            </Row>
          </Form>
          <DisplayHolidays holidays={holidays} />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
