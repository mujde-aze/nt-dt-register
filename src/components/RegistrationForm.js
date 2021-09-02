import {Button, Col, Form, Row} from "react-bootstrap";
import {useRef, useState} from "react";
import useGoogleAutoComplete from "../Hooks/GoogleAutoComplete";

function RegistrationForm() {
  const streetElement = useRef();
  const placeItems = useGoogleAutoComplete(streetElement);
  const [formState, setFormState] = useState({
    givenName: "",
    surname: "",
    age: "",
    street: "",
    flatNumber: "",
    city: "",
    area: "",
    country: "",
    ageConfirmation: "",
  });

  console.log(placeItems);
  if (placeItems !== undefined) {
    setFormState({...formState, ...placeItems});
  }

  function handleChange(event) {
    setFormState({...formState, [event.target.name]: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formState);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGivenName">
            <Form.Label>Given Name</Form.Label>
            <Form.Control type="text" name="givenName" placeholder="Enter given name"
              value={formState.givenName} onChange={handleChange}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" name="surname" placeholder="Enter surname"
              value={formState.surname} onChange={handleChange}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Select name="age" value={formState.age} onChange={handleChange}>
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
            <Form.Control ref={streetElement} type="text" name="street" placeholder="Enter street name"
              value={formState.street} onChange={handleChange}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridFlatNumber">
              <Form.Label>Flat Number</Form.Label>
              <Form.Control type="text" name="flatNumber" placeholder="Enter flat number"
                value={formState.flatNumber} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="locality">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="Enter city"
                value={formState.city} onChange={handleChange}/>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="sublocality_level_1">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" name="area" placeholder="Enter Area"
                value={formState.area} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" placeholder="Country"
                value={formState.country} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" id="formGridAgeConfirmation">
            <Form.Check type="checkbox" name="ageConfirmation" id="age-confirmation"
              label="I am older than 18" value={formState.ageConfirmation} onChange={handleChange}/>
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
