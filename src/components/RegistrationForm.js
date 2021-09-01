import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect} from "react";
import {initMap} from "../Services/GoogleAutocomplete";
import {Loader} from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function RegistrationForm() {
  useEffect(() => {
    loader.load()
        .then(() => {
          initMap();
        }).catch((e) => {
          console.error(`Failed to load autocomplete: ${e}`);
        });
  }, []);

  return (
    <div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGivenName">
            <Form.Label>Given Name</Form.Label>
            <Form.Control type="text" placeholder="Enter given name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter surname" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Select>
                <option>Select your age group</option>
                <option>18-22</option>
                <option>23-25</option>
                <option>26-30</option>
                <option>31-40</option>
                <option>41-60</option>
                <option>60+</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="location">
            <Form.Label>Street Name</Form.Label>
            <Form.Control type="text" placeholder="Enter street name" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridFlatNumber">
              <Form.Label>Flat Number</Form.Label>
              <Form.Control type="text" placeholder="Enter flat number" />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="street_number">
              <Form.Label>Street Number</Form.Label>
              <Form.Control type="text" placeholder="Enter street number" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="locality">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="sublocality_level_1">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" placeholder="Enter Area" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Country" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" id="formGridAgeConfirmation">
            <Form.Check type="checkbox" id="age-confirmation"
              label="I am older than 18" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={3}>
            <Button variant="primary" type="submit">
            Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegistrationForm;
