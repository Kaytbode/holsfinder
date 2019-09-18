import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DisplayHolidays extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, holiday: { date: '', name: '' } };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(event) {
    const { holidays } = this.props;
    const { value } = event.target;
    const holsValue = holidays.filter(({ date }) => (Number(date.split('-')[2])) === Number(value));
    this.setState({ holiday: holsValue[0], show: true });
  }

  render() {
    const { holidays } = this.props;
    const { show, holiday } = this.state;

    const holidayDates = holidays.map(({ date }) => Number(date.split('-')[2]));

    const daysOfTheMonth = Array.from({ length: 31 }, (v, i) => i + 1);

    return (
      <div className="container">
        {
            daysOfTheMonth.map((val) => {
              if (holidayDates.indexOf(val) > -1) {
                return (
                  <div key={val} className="green-div">
                    <Button onClick={this.handleShow} value={val}>{val}</Button>
                  </div>
                );
              }
              return <div key={val} className="white-div">{val}</div>;
            })
          }
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Holiday Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <p> Date: { holiday.date }</p>
             <p> Name: { holiday.name }</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DisplayHolidays.propTypes = {
  holidays: PropTypes.arrayOf.isRequired
};

export default DisplayHolidays;
