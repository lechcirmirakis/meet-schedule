import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from '../hoc/container';

const navbar = props => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="App Logo"
            src="images/icons/meet.png"
            className="App__Logo"
          />
          {' Meet Schedule'}
        </Navbar.Brand>
        <Button variant="success" onClick={props.addTrigger}>Add</Button>
      </Container>
    </Navbar>
  )
}

export default navbar;