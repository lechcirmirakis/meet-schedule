import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/Navbar/navbar';
import List from './components/List/list';
import DelModal from './components/Modals/delModal';
import AddModal from './components/Modals/addModal';
import Filters from './components/Filters/filters';
import staticlist from './static/list';
import './App.scss';

class App extends Component {
  state = {
    list: [],
    listForReset: [],
    delModalShow: false,
    addModalShow: false,
    // formValid: false,
    // hourValid: true,
    todaDate: false,
    sortAscent: true,
    filtersState: false,
    dateRange: {
      dateFrom: '',
      dateTo: '',
      disabledTo: true,
      validInputs: false,
      validDates: false
    },
    meetToDel: {
      id: null,
      title: ''
    }
  }

  componentDidMount() {
    if (!this.state.todaDate) {
      // const formInputs = { ...this.state.formInputs };
      // formInputs.date.min = this.getTodayDate();

      // when main up component did mount, get static data and sort them
      this.setState({
        list: staticlist,
        // formInputs: formInputs,
        todayDate: true
      }, () => {
        this.sortMeetings();
      })
    }
  }

  // sorting list of meetings
  sortMeetings = () => {
    const allMeetings = [...this.state.list];
    const sortState = this.state.sortAscent;
    const sortKey = 'date';

    if (!sortState) {
      allMeetings.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    }
    else {
      allMeetings.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
    }

    this.setState({ list: allMeetings, sortAscent: !sortState });
  }

  filtersTrigger = () => this.setState({ filtersState: !this.state.filtersState });

  filterMeetings = () => {
    let dateFrom = Date.parse(this.state.dateRange.dateFrom);
    let dateTo = Date.parse(this.state.dateRange.dateTo);
    const dataRangeState = this.state.dateRange;

    if (dateFrom < dateTo) {
      console.log(true);
      const listToFilter = this.state.list;
      dataRangeState.validDates = true;

      this.setState({ dateRange: dataRangeState, listForReset: listToFilter });
    }
    else {
      console.log(false);

      dataRangeState.validDates = 'error';
      this.setState({ dateRange: dataRangeState });
    }
  }

  resetFilters = () => {
    const listBeforFilter = this.state.listForReset;
    const dataRangeReset = this.state.dateRange;

    dataRangeReset.dateFrom = '';
    dataRangeReset.dateTo = '';
    dataRangeReset.disabledTo = true;
    dataRangeReset.validInputs = false;
    dataRangeReset.validDates = false;

    this.setState({ list: listBeforFilter, dateRange: dataRangeReset });
  }

  updateFiltersHandler = event => {
    const dateName = event.target.name;
    const dateValue = event.target.value;

    const dateRange = { ...this.state.dateRange }
    dateRange[dateName] = dateValue;

    if (this.state.dateRange.dateFrom === '') {
      dateRange.disabledTo = false;
    }
    if (this.state.dateRange.dateFrom !== '' && this.state.dateRange.dateTo === '') {
      dateRange.validInputs = true;
    }

    this.setState({ dateRange: dateRange });
  }

  showItemDescript = id => {
    const meetList = [...this.state.list];
    const meetIndex = meetList.findIndex(item => item.id === id);
    const openState = meetList[meetIndex].open;
    meetList[meetIndex].open = !openState;

    this.setState({ list: meetList });
  }

  modalTrigger = (modal, id, title) => {
    const modalState = modal === 'del' ? this.state.delModalShow : this.state.addModalShow;
    const modalToTrigg = modal === 'del' ? 'delModalShow' : 'addModalShow';

    if (!modalState && modal === 'del') {
      const meetTodelState = this.state.meetToDel;
      meetTodelState.id = id;
      meetTodelState.title = title;

      this.setState({ delModalShow: !modalState, meetToDel: meetTodelState });
      return
    }

    // if (modal !== 'del') {
    //   this.formReset();
    // }

    this.setState({ [modalToTrigg]: !modalState, hourValid: true });
  }

  delMeetingHandler = () => {
    const meetList = [...this.state.list];
    let refreshArray = meetList.filter(item => item.id !== this.state.meetToDel.id);

    this.setState({ list: refreshArray, delModalShow: false });
  }

  addMeetingHandler = newMeet => {
    const meetList = [...this.state.list];
    meetList.push(newMeet);

    this.setState({ list: meetList, addModalShow: false });
  }

  render() {
    // console.log('APP RENDER');

    return (
      <div className='App'>
        <Navbar
          addTrigger={this.modalTrigger}
          filtersState={this.state.filtersState}
          filtersTrigger={this.filtersTrigger}
        />
        <Container>
          <Filters
            sortAscent={this.state.sortAscent}
            sortHandler={this.sortMeetings}
            filterHandler={this.filterMeetings}
            numberOfMeetings={this.state.list.length}
            updateDate={this.updateFiltersHandler}
            dateRange={this.state.dateRange}
            filtersState={this.state.filtersState}
            resetFilters={this.resetFilters}
          />
          <List
            meetList={this.state.list}
            showDescript={this.showItemDescript}
            modalTrigger={this.modalTrigger}
            filtersState={this.state.filtersState}
          />
          <DelModal
            show={this.state.delModalShow}
            delTrigger={this.modalTrigger}
            delHandler={this.delMeetingHandler}
            meetTitle={this.state.meetToDel.title}
          />
          <AddModal
            show={this.state.addModalShow}
            addTrigger={this.modalTrigger}
            onAddMeeting={this.addMeetingHandler}
          />
        </Container>
      </div>
    );
  }
}

export default App;
