import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/navbar';
import List from './components/list';
import DelModal from './components/delModal';
import staticlist from './static/list';
import './App.scss';

class App extends Component {
  state = {
    list: [],
    delModalShow: false,
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

  delModalTrigger = (id, title) => {
    const modalState = this.state.delModalShow;

    if (!modalState) {
      const meetTodelState = this.state.meetToDel;
      meetTodelState.id = id;
      meetTodelState.title = title;

      this.setState({ delModalShow: !modalState, meetToDel: meetTodelState });
      return
    }

    this.setState({ delModalShow: !modalState });
  }

  delMeetingHandler = () => {
    const meetList = [...this.state.list];
    let refreshArray = meetList.filter(item => item.id !== this.state.meetToDel.id);

    this.setState({list: refreshArray, delModalShow: false});
  }

  render() {
    console.log('APP RENDER');

    return (
      <div className="App">
        <Navbar />
        <Container>
          <List
            meetList={this.state.list}
            showDescript={this.showItemDescript}
            delTrigger={this.delModalTrigger}
          />
          <DelModal
            show={this.state.delModalShow}
            delTrigger={this.delModalTrigger}
            delHandler={this.delMeetingHandler}
            meetTitle={this.state.meetToDel.title}
          />
        </Container>
      </div>
    );
  }
}

export default App;
