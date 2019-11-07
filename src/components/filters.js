import React from 'react';
import Button from 'react-bootstrap/Button';

const filters = props => {
  return (
    <div className="filters">
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
    </div>
  )
}

export default filters;