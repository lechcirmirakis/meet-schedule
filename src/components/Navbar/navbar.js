import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from '../../hoc/container';

const navbar = React.memo(props => {
  console.log('NAVBAR RENDER');
  
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="App Logo"
            src="images/icons/meet.png"
            className="brand-logo"
          />
          <span className='brand-name'>{' Meet Schedule'}</span>
        </Navbar.Brand>
        <div className="navbar-buttons">
          <Button variant="success" onClick={props.addTrigger}>Add</Button>
          <Button variant={!props.filtersState ? "outline-primary" : "primary"} onClick={props.filtersTrigger}>Filters</Button>
        </div>
      </Container>
    </Navbar>
  )
})

export default navbar;