import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaRegTimesCircle,
  FaUserCircle,
  FaSnapchatGhost,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../redux/actions/actionsType";

function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLogIn);
  const [search, setSearch] = useState(false);

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
      className="ourNav"
    >
      <Container>
        <NavLink className="logo nav-link" to="/">
          MARKETONCIS{" "}
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
              About Us
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

            <FaSnapchatGhost />

            <NavDropdown
              title={<FaUserCircle />}
              id="collasible-nav-dropdown py-0"
            >
              {isLoggedIn && (
                <NavDropdown.Item>
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
              )}
              {isLoggedIn || (
                <NavDropdown.Item>
                  <NavLink to="/register">Register</NavLink>
                </NavDropdown.Item>
              )}
              {isLoggedIn || (
                <NavDropdown.Item>
                  <NavLink to="/login">Login</NavLink>
                </NavDropdown.Item>
              )}
              {isLoggedIn && (
                <>
                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={() => logOut()}>
                    Logout
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
