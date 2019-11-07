import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import FilterBox from './filterBox';
import SortBox from './sortBox';

const filters = props => {
  const dateValid = props.dateRange.validDates;
  let filtersStatus;

  if (dateValid === 'error') {
    filtersStatus = (
      <p className="status-error">Start date cannot be greater than end date </p>
    )

    document.querySelector('.filter-status').style.display = 'block';
  }

  else {
    filtersStatus = (
      <React.Fragment>
        <p>Show Meetings between:</p>
        <p> {props.dateRange.dateFrom} - {props.dateRange.dateTo}</p>
      </React.Fragment>
    )
  }

  return (
    <Collapse in={props.filtersState}>
      <div>
        <div className="filters">
          <FilterBox
            updateDate={props.updateDate}
            filterHandler={props.filterHandler}
            dateRange={props.dateRange}
            resetFilters={props.resetFilters}
          />
          <SortBox
            sortAscent={props.sortAscent}
            sortHandler={props.sortHandler}
            numberOfMeetings={props.numberOfMeetings}
          />
        </div>
        <div className={["filter-status", dateValid ? 'filter-status--show' : null].join(' ')}>
          {filtersStatus}
        </div>
      </div>
    </Collapse>
  )
}

export default filters;