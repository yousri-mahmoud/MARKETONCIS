import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  NavDropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  FaSearch,
  FaRegTimesCircle,
  FaUserCircle,
  FaSnapchatGhost,
} from "react-icons/fa";
function NavbarComponent() {
  const [search, setSearch] = useState(false);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="ourNav"
    >
      <Container>
        {/* <Navbar.Brand href="#home">MARKETONCIS</Navbar.Brand> */}
        <NavLink className="logo nav-link" to="/">
          MARKETONCIS{" "}
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link navItem" to="/social-media">
              Blog
            </NavLink>
            <NavLink className="nav-link navItem" to="/market">
              Market
            </NavLink>
            <NavLink className="nav-link navItem" to="/about-us">
              About-Us
            </NavLink>
          </Nav>
          <Nav className="align-items-center">
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
            {/* commet */}

            {/* commet */}
            <FaSnapchatGhost />

            <NavDropdown
              title={<FaUserCircle />}
              id="collasible-nav-dropdown py-0"
            >
              <NavDropdown.Item>
                <Link to="/profile">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/register">Register</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/login">Login</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
