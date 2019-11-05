import React from 'react';
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
            showDescript={() => props.showDescript(id)}/>
    }

    return (
        <>
            {props.meetList.map(showList)}
        </>
    )
}

export default list;