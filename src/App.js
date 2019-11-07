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
    formValid: false,
    hourValid: true,
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
    formInputs: {
      name: {
        value: '',
        title: 'Meeting title',
        validText: 'Enter the meeting title!',
        required: true,
        type: 'text',
        placeholder: 'Meeting title'
      },
      descript: {
        value: '',
        title: 'Meeting description',
        validText: 'Enter the meeting descript!',
        required: true,
        as: 'textarea',
        rows: '4',
        placeholder: 'Meeting description'
      },
      date: {
        value: '',
        title: 'Meeting date',
        validText: 'Enter the meeting date (min today date)!',
        required: true,
        type: 'date',
        placeholder: null,
        min: ''
      },
      start: {
        value: '',
        title: 'Start of meeting',
        validText: 'Select the meeting start time!',
        required: true,
        type: 'time'
      },
      end: {
        value: '',
        title: 'End of meeting',
        validText: 'Select the meeting end time!',
        required: true,
        type: 'time'
      },
    },
    meetToDel: {
      id: null,
      title: ''
    }
  }

  componentDidMount() {
    if (!this.state.todaDate) {
      const formInputs = { ...this.state.formInputs };
      formInputs.date.min = this.getTodayDate();

      // when main up component did mount, get static data and sort them
      this.setState({
        list: staticlist,
        formInputs: formInputs,
        todayDate: true
      }, () => {
        this.sortMeetings();
      })
    }
  }

  // get Today Date for date input in add meet form
  getTodayDate = () => {
    let todayDate = new Date();

    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    return todayDate = yyyy + '-' + mm + '-' + dd;
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

    this.setState({list: listBeforFilter, dateRange: dataRangeReset});
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

  updateInputsHandler = event => {
    const formInputs = { ...this.state.formInputs }
    formInputs[event.target.name].value = event.target.value;

    this.setState({ formInputs: formInputs })
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

    if (modal !== 'del') {
      this.formReset();
    }

    this.setState({ [modalToTrigg]: !modalState, hourValid: true });
  }

  delMeetingHandler = () => {
    const meetList = [...this.state.list];
    let refreshArray = meetList.filter(item => item.id !== this.state.meetToDel.id);

    this.setState({ list: refreshArray, delModalShow: false });
  }

  formReset = () => {
    // const resetForm = { ...this.state.formInputs };
    const resetForm = Object.assign({}, this.state.formInputs);

    // HOW IT WORKS????  ?????????????????????????????????????????????????
    for (const key in resetForm) {
      resetForm[key].value = ''
    }

    console.log(this.state.formInputs);
  }

  submitFormHandler = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      this.setState({ formValid: true });
    }
    else {
      let startTime = Date.parse('01/01/2011 ' + this.state.formInputs.start.value);
      let endTime = Date.parse('01/01/2011 ' + this.state.formInputs.end.value);

      if (!(endTime > startTime)) {
        this.setState({ hourValid: false });
        return
      }

      const meetList = [...this.state.list]

      // get meeting ids for generate new meet id 
      const ids = meetList.map(element => element.id);

      // add new meet to list
      const meetToAdd = {
        id: ids.length !== 0 ? Math.max(...ids) + 1 : 1,
        title: this.state.formInputs.name.value,
        descript: this.state.formInputs.descript.value,
        date: this.state.formInputs.date.value,
        startTime: this.state.formInputs.start.value,
        endTime: this.state.formInputs.end.value,
        open: false
      }

      this.formReset();
      meetList.push(meetToAdd);

      this.setState({
        list: meetList,
        formValid: false,
        hourValid: true,
        addModalShow: false
      });
    }
  }

  render() {
    // console.log('APP RENDER');

    // change form Inputs object to array
    const formInputsArray = [];

    for (const key in this.state.formInputs) {
      formInputsArray.push({
        key: key,
        config: this.state.formInputs[key]
      })
    }

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
            valid={this.state.formValid}
            handleSubmit={this.submitFormHandler}
            inputsArray={formInputsArray}
            updateInput={this.updateInputsHandler}
            hourValid={this.state.hourValid}
          />
        </Container>
      </div>
    );
  }
}

export default App;
