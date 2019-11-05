import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from './hoc/container';
import Navbar from './components/navbar';
import List from './components/list';
import staticlist from './static/list';
import './App.scss';

class App extends Component {
  state = {
    list: []
  }

  componentDidMount() {
    console.log('component did');
    this.setState({ list: staticlist });
  }

  showDescript = id => {
    const meetList = [...this.state.list];
    const userIndex = meetList.findIndex(item => item.id === id);

    const openState = meetList[userIndex].open;
    meetList[userIndex].open = !openState;

    this.setState({list: meetList});
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
            showDescript={this.showDescript} />
        </Container>
      </div>
    );
  }
}

export default App;
