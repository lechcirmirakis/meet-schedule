import React from 'react';
import FilterBox from './filterBox';
import SortBox from './sortBox';

const filters = props => {
  return (
    <div className="filters">
      <FilterBox 
        updateDate={props.updateDate}
      />
      <SortBox 
        sortAscent={props.sortAscent}
        sortHandler={props.sortHandler}
        numberOfMeetings={props.numberOfMeetings}
      />
    </div>
  )
}

export default filters;