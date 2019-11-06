import React, { memo } from 'react';
import Button from 'react-bootstrap/Button';
import ListItem from './listItem';

const list = props => {
  const showList = item => {
    const { id, title, descript, date, startTime, endTime, open } = item;
    return <ListItem
      key={id}
      title={title}
      descript={descript}
      date={date}
      starttime={startTime}
      endtime={endTime}
      open={open}
      showDescript={() => props.showDescript(id)}
      deltrigger={() => props.delTrigger("del", id, title)} />
  }

  const lengthState = props.meetList.length > 0

  const icon = !lengthState ? <img className="list_icon" src="images/icons/stop.png" alt="no meetings" /> : null
  const meetings = lengthState ? props.meetList.map(showList) : <h4 className="list_title">You don't have any meetings scheduled</h4>
  const addButotn = !lengthState ? <Button variant="success">Add meeting </Button> : null;
  
  return (
    <div className={['meet_list', !lengthState ? 'flex-center' : null].join(' ')}>
      {icon}
      {meetings}
      {addButotn}
    </div>
  )
}

export default memo(list);