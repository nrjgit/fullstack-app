import React from "react";
import {
  Nav,
  Navbar,
  Container
} from "react-bootstrap";

const NavBar = ({ isLoggedIn, userName }) => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ParkHero</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <Nav.Link href="#" className="text-light">
                  Signed in as: {userName}
                </Nav.Link>
              )}
            </Nav>
            <span className="navbar-text text-light">Have a great day!</span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

// https://www.google.com/maps/embed/v1/streetview?location=37.7913,-122.3936&key=AIzaSyAjxQyFojuSIOq57lXHmAUbLjG44PYIoAE

export default NavBar;
