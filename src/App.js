import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import CreateUser from "./components/user/create";
import ListUser from "./components/user/list";
import EditUser from "./components/user/edit";

function App() {
  return (<Router>
    <Navbar bg="info">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Phone Book
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route exact path='/' element={<ListUser />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
