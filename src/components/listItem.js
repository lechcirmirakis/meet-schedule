import React, { memo } from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

const listItem = props => {
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
      </Card.Body>
    </Card>
  )
}

export default memo(listItem);