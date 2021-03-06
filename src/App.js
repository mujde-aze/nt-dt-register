import "./App.css";
import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import PropTypes from "prop-types";
import {Wrapper} from "@googlemaps/react-wrapper";
import SuccessView from "./components/SuccessView";

function App({firebase}) {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <BrowserRouter>
            <Routes>
              <Route path="/success">
                <SuccessView />
              </Route>
              <Route path="/">
                <Wrapper libraries={["places"]} language="az" apiKey={process.env.REACT_APP_API_KEY}>
                  <RegistrationForm firebase={firebase} />
                </Wrapper>
              </Route>
            </Routes>
          </BrowserRouter>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

App.propTypes = {
  firebase: PropTypes.object,
};

export default App;
