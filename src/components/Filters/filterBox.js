import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const filterBox = props => {
  // console.log(props.dateRange);
  
  return (
    <div className="filter-box">
      <Form.Control
        value={props.dateRange.dateFrom}
        type="date"
        name="dateFrom"
        min='1990-01-01'
        onChange={(event) => props.updateDate(event, 'filter')}
      />
      <Form.Control
        value={props.dateRange.dateTo}
        type="date"
        name="dateTo"
        onChange={(event) => props.updateDate(event, 'filter')}
        min={props.dateRange.dateFrom}
        disabled={props.dateRange.disabledTo}
      />
      <Button onClick={props.filterHandler} disabled={!props.dateRange.validInputs}>Filter</Button>
      <Button onClick={props.resetFilters} disabled={!props.dateRange.validDates} variant="outline-info"> Reset </Button>
    </div>
  )
}

export default filterBox;