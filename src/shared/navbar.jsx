import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaRegTimesCircle,
  FaUserCircle,
  FaSnapchatGhost,
} from "react-icons/fa";
function NavbarComponent() {
  const [search, setSearch] = useState(true);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">MARKETONCIS</Navbar.Brand> */}
        <NavLink className="logo nav-link" to="/">
          MARKETONCIS{" "}
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/social-media">
              Blog
            </NavLink>
            <NavLink className="nav-link" to="/market">
              Market
            </NavLink>
            <NavLink className="nav-link" to="/about-us">
              About-Us
            </NavLink>
          </Nav>
          <Nav>
            {search ? (
              <>
                {" "}
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 search_input"
                  aria-label="Search"
                />
                <FaRegTimesCircle
                  className="closeSearch_icon"
                  onClick={() => setSearch(false)}
                />
              </>
            ) : (
              <FaSearch
                className="search_icon"
                onClick={() => setSearch(true)}
              />
            )}

            <FaSnapchatGhost />
            <NavLink to="/profile">
              <FaUserCircle />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
