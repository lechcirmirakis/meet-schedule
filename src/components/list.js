import React from 'react';
import DelModal from './delModal';
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
      deltrigger={props.delTrigger} />
  }

  return (
    <>
      {props.meetList.map(showList)}
      <DelModal
        show={props.delModalState}
        deltrigger={props.delTrigger}
      />
    </>
  )
}

export default list;