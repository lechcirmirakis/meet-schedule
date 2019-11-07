import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const listItem = props => {
  console.log('list Item render');

  return (
    <Card>
      <Card.Body>
        <div className="card-content" onClick={props.showDescript}>
          <Card.Title >{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">date: {props.date}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">hours: {props.starttime} - {props.endtime}</Card.Subtitle>
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

export default listItem;