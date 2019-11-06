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
    formInputs: {
      name: {
        value: ''
      },
      descript: {
        value: ''
      },
      date: {
        value: ''
      },
      start: {
        value: ''
      },
      end: {
        value: ''
      },
    },
    meetToDel: {
      id: null,
      title: ''
    }
  }

  componentDidMount() {
    console.log('component did APP.js');
    this.setState({ list: staticlist });
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

    this.setState({ [modalToTrigg]: !modalState });
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

  submitFormHandler = event => {
    console.log(event.currentTarget);
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      this.setState({ formValid: true });
    }
    else {
      event.preventDefault();
      event.stopPropagation();

      this.setState({ formValid: false });
      console.log(this.state.formInputs);
    }
  }

  render() {
    console.log('APP RENDER');

    return (
      <div className="App">
        <Navbar
          addTrigger={this.modalTrigger}
        />
        <Container>
          <List
            meetList={this.state.list}
            showDescript={this.showItemDescript}
            delTrigger={this.modalTrigger}
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
            formValues={this.state.formInputs}
            updateInput={this.updateInputsHandler}
          />
        </Container>
      </div>
    );
  }
}

export default App;
