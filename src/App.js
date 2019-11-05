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

  render() {
    console.log('APP RENDER');
    console.log(this.state.list);

    return (
      <div className="App">
        <Navbar />
        <Container>
          <List meetList={this.state.list}/>
        </Container>
      </div>
    );
  }
}

export default App;
