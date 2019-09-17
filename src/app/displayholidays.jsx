import React, { Component } from 'react';
import PropTypes from 'prop-types';


const DisplayHolidays = ({ holidays }) => {
  return (
    <ul>
      {holidays.data.map((country) => (
        <li key={country.country}>{country.name}</li>
      ))}
    </ul>
  );
};

DisplayHolidays.propTypes = {
  holidays: PropTypes.shape({
    statusCode: PropTypes.number,
    data: PropTypes.array
  }).isRequired
};

export default DisplayHolidays;
