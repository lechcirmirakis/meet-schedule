import React, { memo } from 'react';
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
      deltrigger={() => props.delTrigger(id, title)} />
  }

  const lengthState = props.meetList.length > 0
  const meetings = lengthState ? props.meetList.map(showList) : <h4 className="list_title">You don't have any meetings scheduled</h4>
  const classes = ['meet_list', !lengthState ? 'flex-center' : null];

  return (
    <div className={classes.join(' ')}>
      {meetings}
    </div>
  )
}

export default memo(list);