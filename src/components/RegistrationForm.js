import {Col, Form, Row} from "react-bootstrap";

function RegistrationForm() {
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
        <Row>
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridFlatNumber">
              <Form.Label>Flat Number</Form.Label>
              <Form.Control type="number" placeholder="Enter flat number" />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridStreetNumber">
              <Form.Label>Street Number</Form.Label>
              <Form.Control type="number" placeholder="Enter street number" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="foArmGridStreetName">
            <Form.Label>Street Name</Form.Label>
            <Form.Control type="text" placeholder="Enter street name" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" id="formGridAgeConfirmation">
            <Form.Check type="checkbox" id="age-confirmation"
              label="I am older than 18" />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default RegistrationForm;
