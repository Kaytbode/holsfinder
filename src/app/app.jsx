import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Form, Row, Col } from 'react-bootstrap';
import DisplayHolidays from './displayholidays';
import '../styles/scss/app.scss';
import DisplayNavs from './nav';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      month: '',
      holidays: [],
      countries: []
    };

    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const api = 'https://holsfinderapi.herokuapp.com/api/v1/countries';
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const initialData = data.data.map((value) => value);
        this.setState({
          countries: initialData
        });
      });
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
        const initialData = data.data.map((value) => value);
        this.setState({
          holidays: initialData
        });
      });

    event.preventDefault();
  }

  render() {
    const {
      holidays, month, country, countries
    } = this.state;

    const optionItems = countries.map((value) => (
      <option key={value.name} value={value.code}>{value.name}</option>
    ));

    return (
      <div>
        <DisplayNavs />
        <div className="container">
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Choose Country</Form.Label>
                <select value={country} onChange={this.handleCountryChange}>
                  <option value="">Choose Country</option>
                  { optionItems }
                </select>
              </Col>
              <Col>
                <Form.Label>Choose Month</Form.Label>
                <select value={month} onChange={this.handleMonthChange}>
                  <option value="">Choose Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={{ span: 4, offset: 2 }} md={{ span: 4, offset: 0 }}>
                <Form.Control className="display" type="submit" value="Find Holidays" />
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
