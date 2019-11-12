import React from 'react';
import Button from 'react-bootstrap/Button';

const sortBox = React.memo(props => {
  return (
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
  )
});

export default sortBox;