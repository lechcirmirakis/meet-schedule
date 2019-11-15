import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import withTodayDate from '../../hoc/todayDate';

const ListItem = props => {
  const [pastState, setPastState] = useState(false);

  useEffect(() => {
    if (props.todayDate <= props.date) {
      setPastState(true);
    }
  }, [props.todayDate, props.date]);

  return (
    <Card>
      <Card.Body>
        <div className="card-content" onClick={props.showDescript}>
          <Card.Title >{props.title}</Card.Title>
          <Card.Subtitle className={["mb-2", !pastState ? 'past' : 'actual'].join(' ')}>date: {props.date} {!pastState ? 'past' : null}</Card.Subtitle>
          <Card.Subtitle className="mb-2">hours: {props.starttime} - {props.endtime}</Card.Subtitle>
          <Collapse in={props.open}>
            <p>
              {props.descript}
            </p>
          </Collapse>
        </div>
        <Button variant="warning" onClick={props.deltrigger}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default withTodayDate(ListItem);