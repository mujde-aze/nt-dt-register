import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {Loader} from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function RegistrationForm() {
  const streetElement = useRef();
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

  useEffect(() => {
    loader.load()
        .then((google) => {
          const autocomplete = new google.maps.places.Autocomplete(streetElement.current, {
            componentRestrictions: {country: ["aze"]},
            fields: ["address_components", "geometry"],
            types: ["address"],
          });
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            fillInAddress(place);
          });
        }).catch((e) => {
          console.error(`Failed to load autocomplete: ${e}`);
        });
  }, []);

  function fillInAddress(place) {
    const addressNameFormat = {
      "street_number": "short_name",
      "route": "long_name",
      "locality": "long_name",
      "sublocality_level_1": "short_name",
      "country": "long_name",
    };
    const getAddressComp = function(type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return "";
    };

    setFormState({...formState, street: getAddressComp("street_number") + " " + getAddressComp("route"),
      city: getAddressComp("locality"),
      area: getAddressComp("sublocality_level_1"),
      country: getAddressComp("country"),
    });
  }

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
    console.log(formState.givenName);
    event.preventDefault();
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
