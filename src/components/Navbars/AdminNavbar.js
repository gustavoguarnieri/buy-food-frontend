import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import UserService from "../../services/UserService";
import {Link, useHistory} from "react-router-dom";

function Header() {
  const history = useHistory()

  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const pushHome = () => {
    history.push("/home")
  }
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>

        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"/>
          </Button>
          <Link to={`/home`}>
            <Navbar.Brand>
              Buy food
            </Navbar.Brand>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"/>
          <span className="navbar-toggler-bar burger-lines"/>
          <span className="navbar-toggler-bar burger-lines"/>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link className="m-0">
                <span>Bem-vindo {UserService.getUsername()}</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                  className="m-0"
                  onClick={() => {pushHome(); UserService.doLogout()}}>
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
