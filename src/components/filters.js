import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const filters = props => {
  return (
    <>
      <div className="filters">
        <div className="filter-box">
          <Form.Control
            type="date"
            name="dateFrom"
          />
          <Form.Control
            type="date"
            name="dateTo"
          />
          <Button>Filter</Button>
        </div>
        <div className="sorting-box">
          <Button
            variant="outline-secondary"
            className="sort-btn"
            onClick={props.sortHandler}
            disabled={props.numberOfMeetings <= 1}>
            Sort
          <img
            className={["sort-arrow", props.sortAscent ? 'up' : null].join(' ')}
            src="images/icons/triangle.png"
            alt="triangle" />
          </Button>
          <span>By Date</span>
        </div>
      </div>
    </>
  )
}

export default filters;