import "./App.css";
import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <BrowserRouter>
            <Switch>
              <Route path="/success">

              </Route>
              <Route path="/">
                <RegistrationForm />
              </Route>
            </Switch>
          </BrowserRouter>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default App;
