import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const FilterBox = props => {

  const filtersInputsArray = [];

  for (const key in props.filtersInputs) {
    filtersInputsArray.push({
      key: key,
      config: props.filtersInputs[key]
    })
  }

  return (
    <div className="filter-box">
      {
        filtersInputsArray.map(input => {
          return (
            <Form.Control
              key={input.key}
              value={input.config.value}
              type={input.config.type}
              name={input.key}
              min={input.config.min}
              disabled={input.config.disabled}
              onChange={event => props.updateFiltersHandler(event)}
            />
          )
        })
      }
      <Button onClick={props.filterHandler} disabled={!props.validInputs}>Filter</Button>
      <Button onClick={props.resetFilters} disabled={!props.validDates} variant="outline-info"> Reset </Button>
    </div>
  )
}

export default FilterBox;