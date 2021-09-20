import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import useGoogleAutoComplete from "../Hooks/GoogleAutoComplete";
import {getFunctions, httpsCallable, connectFunctionsEmulator} from "firebase/functions";
import PropTypes from "prop-types";
import useFbPixelScript from "../Hooks/FbPixelScript";

function RegistrationForm({firebase}) {
  useFbPixelScript();
  const provinceElement = useRef();
  const form = useRef();
  const placeItems = useGoogleAutoComplete(provinceElement);

  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    givenName: "",
    surname: "",
    phoneNumber: "",
    age: "",
    street: "",
    streetNumber: "",
    province: "",
    cityVillage: "",
    country: "",
    ageConfirmation: "",
    source: "google",
  });

  useEffect(() => {
    if (placeItems !== undefined) {
      setFormState((prevState) => ({...prevState, ...placeItems}));
    }
  }, [placeItems]);

  function handleChange(event) {
    if (event.target.name === "ageConfirmation") {
      setFormState((prevState) => ({...prevState, [event.target.name]: event.target.checked}));
    } else {
      setFormState((prevState) => ({...prevState, [event.target.name]: event.target.value}));
    }
  }

  async function handleSubmit(token) {
    setValidated(true);
    if (form.current.checkValidity() === false) {
      return;
    }
    const functions = getFunctions(firebase, "australia-southeast1");
    if (process.env.REACT_APP_DEV_MODE) {
      connectFunctionsEmulator(functions, "localhost", 5001);
    }
    const registerContact = httpsCallable(functions, "registerContact");
    try {
      await registerContact({
        registrationRequest: formState,
        recaptchaToken: token,
      });
      console.log("Successfully registered contact.");
    } catch (error) {
      console.error(`Failed to register contact: ${error}`);
    }
  }

  window.handleSubmit = handleSubmit;

  return (
    <Form ref={form} validated={validated}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridGivenName">
          <Form.Label>Ad</Form.Label>
          <Form.Control required type="text" name="givenName" placeholder="Ad"
            value={formState.givenName} onChange={handleChange}/>
          <Form.Control.Feedback type="invalid">
            Zəhmət olmasa adınızı verin.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSurname">
          <Form.Label>Soyad</Form.Label>
          <Form.Control type="text" name="surname" placeholder="Soyad"
            value={formState.surname} onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Neçə yaşınız var?</Form.Label>
            <Form.Select required name="age" value={formState.age} onChange={handleChange}>
              <option></option>
              <option>18-22</option>
              <option>23-25</option>
              <option>26-30</option>
              <option>31-40</option>
              <option>41-60</option>
              <option>60+</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Zəhmət olmasa yaş qrupunuzu seçin.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridStreet">
          <Form.Label>Əv ünvanınız</Form.Label>
          <Form.Control type="text" name="street" placeholder="Əv ünvanınız"
            value={formState.street} onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="formGridStreetNumber">
            <Form.Label>Küçə nömrəniz</Form.Label>
            <Form.Control type="text" name="streetNumber" placeholder="Küçə nömrəniz"
              value={formState.streetNumber} onChange={handleChange}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="locality">
            <Form.Label>Hansı şəhərdə/rayonda yaşayırsız</Form.Label>
            <Form.Control required ref={provinceElement} type="text" name="province"
              onChange={handleChange}/>
            <Form.Control.Feedback type="invalid">
              Zəhmət olmasa etibarlı bir əyalət göstərin.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group as={Col} controlId="sublocality_level_1">
            <Form.Label>Bakıda qalırsanız xahiş edirik rayon adı yazın</Form.Label>
            <Form.Control type="text" name="cityVillage"
              value={formState.cityVillage} onChange={handleChange}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="country">
            <Form.Label>ölkə</Form.Label>
            <Form.Control type="text" name="country" placeholder="ölkə"
              value={formState.country} onChange={handleChange}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Telefon Nömrəniz</Form.Label>
            <Form.Control required pattern="[0-9]{9}" type="text" name="phoneNumber" placeholder="Telefon Nömrəniz"
              value={formState.phoneNumber} onChange={handleChange}/>
            <Form.Control.Feedback type="invalid">
              Zəhmət olmasa etibarlı 9 rəqəmli telefon nömrəsi göstərin.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group className="mb-3" id="formGridAgeConfirmation">
          <Form.Check required type="checkbox" name="ageConfirmation" id="age-confirmation"
            label="o Yaşım 18-dən yuxarıdır" value={formState.ageConfirmation} onChange={handleChange}
            feedback="Təqdim etməzdən əvvəl 18 yaşdan yuxarı olduğunuzu təsdiq etməlisiniz"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={3}>
          <Button className="g-recaptcha" data-sitekey={process.env.REACT_APP_APP_CHECK_PUBLIC_KEY}
            data-callback="handleSubmit" variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

RegistrationForm.propTypes = {
  firebase: PropTypes.object,
};

export default RegistrationForm;
