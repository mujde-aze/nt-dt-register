import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {initMap} from "../Services/GoogleAutocomplete";
import {Loader} from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function RegistrationForm() {
  const [formState, setFormState] = useState({
    givenName: "",
    surname: "",
    age: "",
    street: "",
    flatNumber: "",
    streetNumber: "",
    city: "",
    area: "",
    country: "",
    ageConfirmation: "",
  });

  useEffect(() => {
    loader.load()
        .then(() => {
          initMap();
        }).catch((e) => {
          console.error(`Failed to load autocomplete: ${e}`);
        });
  }, []);

  function handleChange(event) {
    const newFormState = {...formState};
    for (const property in newFormState) {
      if (property === event.target.name) {
        newFormState[property] = event.target.value;
        break;
      }
    }
    setFormState(newFormState);
  }

  function handleSubmit(event) {
    console.log(formState.ageConfirmation);
    console.log(formState.age);
    console.log(formState.city);
    console.log(formState.street);
    event.preventDefault();
  }

  return (
    <div>
      <Form onSubmit={((event) => handleSubmit(event))}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGivenName">
            <Form.Label>Given Name</Form.Label>
            <Form.Control type="text" name="givenName" placeholder="Enter given name"
              value={formState.givenName} onChange={((event) => handleChange(event))}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" name="surname" placeholder="Enter surname"
              value={formState.surname} onChange={((event) => handleChange(event))}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridAge">
              <Form.Label>Age</Form.Label>
              <Form.Select name="age" value={formState.age} onChange={((event) => handleChange(event))}>
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
            <Form.Control type="text" name="street" placeholder="Enter street name"
              value={formState.street} onChange={((event) => handleChange(event))}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="formGridFlatNumber">
              <Form.Label>Flat Number</Form.Label>
              <Form.Control type="text" name="flatNumber" placeholder="Enter flat number"
                value={formState.flatNumber} onChange={((event) => handleChange(event))}/>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="street_number">
              <Form.Label>Street Number</Form.Label>
              <Form.Control type="text" name="streetNumber" placeholder="Enter street number"
                value={formState.streetNumber} onChange={((event) => handleChange(event))}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="locality">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="Enter city"
                value={formState.city} onChange={((event) => handleChange(event))}/>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col} controlId="sublocality_level_1">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" name="area" placeholder="Enter Area"
                value={formState.area} onChange={((event) => handleChange(event))}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" placeholder="Country"
                value={formState.country} onChange={((event) => handleChange(event))}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" id="formGridAgeConfirmation">
            <Form.Check type="checkbox" name="ageConfirmation" id="age-confirmation"
              label="I am older than 18" value={formState.ageConfirmation} onChange={((event) => handleChange(event))}/>
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
