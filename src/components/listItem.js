import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const listItem = props => {
  console.log('list Item render');

  return (
    <Card>
      <Card.Body>
        <Card.Title onClick={props.showDescript}>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.date}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{props.starttime} - {props.endtime}</Card.Subtitle>
        <Collapse in={props.open}>
          <Card.Text>
            {props.descript}
          </Card.Text>
        </Collapse>
        <Button variant="danger" onClick={props.deltrigger}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default listItem;