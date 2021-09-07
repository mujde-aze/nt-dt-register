import "./App.css";
import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import PropTypes from "prop-types";

function App({firebase}) {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Switch>
              <Route path="/success">

              </Route>
              <Route path="/">
                <RegistrationForm firebase={firebase} />
              </Route>
            </Switch>
          </BrowserRouter>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
}

App.propTypes = {
  firebase: PropTypes.object,
};

export default App;
