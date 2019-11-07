import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const filterBox = props => {
  return (
    <div className="filter-box">
      <Form.Control
        type="date"
        name="dateFrom"
        onChange={(event) => props.updateDate(event, 'filter')}
      />
      <Form.Control
        type="date"
        name="dateTo"
        onChange={(event) => props.updateDate(event, 'filter')}
      />
      <Button>Filter</Button>
    </div>
  )
}

export default filterBox;