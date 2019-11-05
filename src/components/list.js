import React, { memo } from 'react';

const list = props => {
    const showList = item => {
        const { id, title, descript, date, startTime, endTime } = item;
        return <div key={id} title={title} descript={descript} date={date} starttime={startTime} endtime={endTime}>{title}</div>
    }

    return (
        <>
            {props.meetList.map(showList)}
        </>
    )
}

export default memo(list);