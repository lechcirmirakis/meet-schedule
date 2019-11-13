import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/Navbar/navbar';
import List from './components/List/list';
import DelModal from './components/Modals/delModal';
import AddModal from './components/Modals/addModal';
import Filters from './components/Filters/filters';
import staticlist from './static/list';
import './App.scss';

const App = () => {
  const [meetListState, setMeetListState] = useState([]);
  const [listForReset, setListForReset] = useState([]);
  const [addModalState, setAddModalState] = useState(false);
  const [filtersShowState, setFiltersShowState] = useState(false);
  const [delModalState, setDelModalState] = useState(false);
  const [meetToDelState, setMeetToDelState] = useState({ id: null, title: '' });
  const [sortAscentState, setSortAscentState] = useState(false);

  useEffect(() => {
    const sortList = staticlist.sort((a, b) => b['date'].localeCompare(a['date']))
    setMeetListState(sortList);
    setListForReset(sortList);
  }, []);

  const addModalTrigger = useCallback(() => setAddModalState(prevState => !prevState), []);
  const filtersTrigger = useCallback(() => setFiltersShowState(prevState => !prevState), []);

  const showItemDescript = id => {
    const meetList = [...meetListState];
    const meetIndex = meetList.findIndex(item => item.id === id);
    const openState = meetList[meetIndex].open;
    meetList[meetIndex].open = !openState;

    setMeetListState(meetList);
  }

  const modalTrigger = (id, title) => {
    if (!delModalState) {
      const meetToDel = { id: id, title: title }
      setMeetToDelState(meetToDel);
    }

    setDelModalState(!delModalState);
  }

  const delMeetingHandler = () => {
    let refreshArray = meetListState.filter(item => item.id !== meetToDelState.id);
    setMeetListState(refreshArray);
    setListForReset(refreshArray);
    setDelModalState(false);
  }

  const addMeetingHandler = newMeet => {
    const meetList = [...listForReset];
    meetList.push(newMeet);
    setMeetListState(meetList);
    setListForReset(meetList);
    setAddModalState(false);
  }

  const sortMeetingsHandler = () => {
    const allMeetings = meetListState;
    const sortState = sortAscentState;

    if (!sortState) {
      allMeetings.sort((a, b) => a['date'].localeCompare(b['date']))
    }
    else {
      allMeetings.sort((a, b) => b['date'].localeCompare(a['date']))
    }

    setMeetListState(allMeetings);
    setSortAscentState(!sortState);
  }

  const filterMeetingsHandler = (dataRange) => {
    const listForFilter = [...listForReset].filter(meet => meet.date >= dataRange.dateFrom && meet.date <= dataRange.dateTo);
    setMeetListState(listForFilter);
  }

  const resetFiltersHandler = () => setMeetListState(listForReset);

  return (
    <div className='App'>
      <Navbar
        addTrigger={addModalTrigger}
        filtersTrigger={filtersTrigger}
        filtersState={filtersShowState}
      />
      <Container>
        <Filters
          sortAscent={sortAscentState}
          sortHandler={sortMeetingsHandler}
          numberOfMeetings={meetListState.length}
          filtersState={filtersShowState}
          filterHandler={filterMeetingsHandler}
          resetHandler={resetFiltersHandler}
        />
        <List
          meetList={meetListState}
          showDescript={showItemDescript}
          modalTrigger={modalTrigger}
          addModalTrigger={addModalTrigger}
          filtersState={filtersShowState}
        />
        <DelModal
          show={delModalState}
          delTrigger={modalTrigger}
          delHandler={delMeetingHandler}
          meetTitle={meetToDelState.title}
        />
        <AddModal
          show={addModalState}
          addTrigger={addModalTrigger}
          onAddMeeting={addMeetingHandler}
        />
      </Container>
    </div>
  )
}

export default App;
