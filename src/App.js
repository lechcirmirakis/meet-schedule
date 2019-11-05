import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/navbar';
import List from './components/list';
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
    console.log('component did');
    this.setState({ list: staticlist });
  }

  showItemDescript = id => {
    const meetList = [...this.state.list];
    const userIndex = meetList.findIndex(item => item.id === id);

    const openState = meetList[userIndex].open;
    meetList[userIndex].open = !openState;

    this.setState({list: meetList});
  }

  delModalTrigger = () => {
    const modalState = this.state.delModalShow;
    this.setState({delModalShow: !modalState})
  }

  render() {
    console.log('APP RENDER');
    console.log(this.state.list);

    return (
      <div className="App">
        <Navbar />
        <Container>
          <List
            meetList={this.state.list}
            showDescript={this.showItemDescript}
            delModalState={this.state.delModalShow}
            delTrigger={this.delModalTrigger}
            />
        </Container>
      </div>
    );
  }
}

export default App;
