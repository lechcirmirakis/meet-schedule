import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/navbar';
import List from './components/list';
import DelModal from './components/delModal';
import AddModal from './components/addModal';
import staticlist from './static/list';
import './App.scss';

class App extends Component {
  state = {
    list: [],
    delModalShow: false,
    addModalShow: false,
    formValid: false,
    hourValid: true,
    todaDate: false,
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

      this.setState({
        list: staticlist,
        formInputs: formInputs,
        todayDate: true
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

  updateInputsHandler = (event, name) => {
    const inputType = event.target.name;
    const inputValue = event.target.value;

    let formInputs = { ...this.state.formInputs }
    formInputs[inputType].value = inputValue;

    this.setState({ formInputs: formInputs })
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
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      this.setState({ formValid: true });
    }
    else {
      event.preventDefault();
      event.stopPropagation();

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
        />
        <Container>
          <List
            meetList={this.state.list}
            showDescript={this.showItemDescript}
            modalTrigger={this.modalTrigger}
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
