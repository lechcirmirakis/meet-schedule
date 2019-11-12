import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import FilterBox from './filterBox';
import filterInputs from '../../static/filtersInputsObject';
import SortBox from './sortBox';

const Filters = props => {
  console.log('FILTERS RENDER');
  const [filterInputsState, setfilterInputsState] = useState(filterInputs);
  const [validInputsState, setValidInputsState] = useState(false);
  const [validDatesState, setValidDatesState] = useState(false);

  const updateFiltersHandler = event => {
    event.persist()
    const updateValue = event.target.value;

    setfilterInputsState(prevState => {
      const newState = { ...prevState }

      if (newState.dateFrom.value === '') {
        newState.dateTo.disabled = false;
      }

      newState[event.target.name].value = updateValue;
      newState.dateTo.min = updateValue;

      if (newState.dateFrom.value !== '' && newState.dateTo.value !== '') {
        setValidInputsState(true)
      }

      return newState
    })
  }

  const filterMeetings = () => {
    console.log('cliclek filter');

    let dateFrom = Date.parse(filterInputsState.dateFrom.value);
    let dateTo = Date.parse(filterInputsState.dateTo.value);

    if (dateFrom < dateTo) {
      setValidDatesState(true);

      const dataRange = {
        dateFrom: filterInputsState.dateFrom.value,
        dateTo: filterInputsState.dateTo.value
      }

      props.filterHandler(dataRange);
    }
    else {
      console.log(false);
      setValidDatesState('error');
    }
  }

  let filtersStatus;

  if (validDatesState === 'error') {  
    filtersStatus = (
      <p className="status-error">Start date cannot be greater than end date </p>
    )

    document.querySelector('.filter-status').style.display = 'block';
  }

  return (
    <Collapse in={props.filtersState}>
      <div>
        <div className="filters">
          <FilterBox
            validInputs={validInputsState}
            validDates={validDatesState}
            filterHandler={filterMeetings}
            filtersInputs={filterInputsState}
            updateFiltersHandler={updateFiltersHandler}
          // resetFilters={props.resetFilters}
          />
          <SortBox
            sortAscent={props.sortAscent}
            sortHandler={props.sortHandler}
            numberOfMeetings={props.numberOfMeetings}
          />
        </div>
        <div className={["filter-status", validDatesState ? 'filter-status--show' : null].join(' ')}>
          {filtersStatus}
        </div>
      </div>
    </Collapse>
  )
}

export default Filters;