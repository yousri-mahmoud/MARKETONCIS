import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../redux/actions/actionsType";
import logo from "../assets/image/logo.png";
function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLogIn);

  const logOut = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="ourNav py-3"
    >
      <Container>
        <NavLink className="nav-link p-0" to="/">
          <img className="logo" src={logo} alt="" />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link navItem" to="/">
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink className="nav-link navItem" to="/social-media">
                Blog
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink className="nav-link navItem" to="/market">
                Market
              </NavLink>
            )}

            <NavLink className="nav-link navItem" to="/about-us">
              About
            </NavLink>
          </Nav>
          <Nav className="align-items-center">
            {isLoggedIn || (
              <NavLink className="text-dark" to="/login">
                <Button className="me-2 py-1" variant="primary">
                  Login
                </Button>
              </NavLink>
            )}
            {isLoggedIn || (
              <NavLink className="text-dark" to="/register">
                <Button className="ms-2 py-1" variant="primary">
                  Register
                </Button>
              </NavLink>
            )}

            {isLoggedIn && (
              <NavDropdown
                title={<FaUserCircle />}
                id="collasible-nav-dropdown py-0"
              >
                {isLoggedIn && (
                  <NavDropdown.Item>
                    <Link className="text-dark" to="/profile">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                )}
                {isLoggedIn && (
                  <>
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      className="text-danger"
                      onClick={() => logOut()}
                    >
                      Logout
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
