import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import useGoogleAutoComplete from "../hooks/GoogleAutoComplete";
import {connectFunctionsEmulator, getFunctions, httpsCallable} from "firebase/functions";
import PropTypes from "prop-types";
import useGoogleTagManager from "../hooks/GoogleTagManager";
import {useHistory} from "react-router-dom";
import {getCountryCodeConstraints, reformatPhoneNumber, retrieveSocialNetworkSource} from "../utilities/Helper";

function RegistrationForm({firebase}) {
  useGoogleTagManager();
  const provinceElement = useRef();
  const form = useRef();
  const placeItems = useGoogleAutoComplete(provinceElement);
  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [showSubmitSpinner, setShowSubmitSpinner] = useState(false);
  const [phoneNumberReadOnly, setPhoneNumberReadOnly] = useState(true);
  const [phoneNumberValidation, setPhoneNumberValidation] = useState({
    pattern: "",
    message: "",
  });
  const [formState, setFormState] = useState({
    givenName: "",
    surname: "",
    phoneNumber: "",
    age: "",
    street: "",
    province: "",
    country: "",
    ageConfirmation: "",
    countryCode: "",
    source: retrieveSocialNetworkSource(document.referrer),
  });

  useEffect(() => {
    if (placeItems !== undefined) {
      setFormState((prevState) => ({...prevState, ...placeItems}));
    }
  }, [placeItems]);

  function handlePhoneNumberChange(event) {
    let reformattedNumber = {
      phoneNumber: event.target.value,
      maxDigitsReached: false,
    };
    if (event.key !== "Backspace") {
      reformattedNumber = reformatPhoneNumber(formState.countryCode, event.target.value);
    }
    if (reformattedNumber.maxDigitsReached === true) {
      event.preventDefault();
    }

    setFormState((prevState) => ({...prevState, [event.target.name]: reformattedNumber.phoneNumber}));
  }

  function handleChange(event) {
    if (event.target.name === "countryCode") {
      const countryCodeValue = event.target.value;
      if (countryCodeValue !== "") {
        setPhoneNumberReadOnly(false);
      } else {
        setPhoneNumberReadOnly(true);
      }

      setPhoneNumberValidation(getCountryCodeConstraints(countryCodeValue));
    }

    if (event.target.name === "ageConfirmation") {
      setFormState((prevState) => ({...prevState, [event.target.name]: event.target.checked}));
    } else {
      setFormState((prevState) => ({...prevState, [event.target.name]: event.target.value}));
    }
  }

  async function handleSubmit(token) {
    setValidated(true);
    setShowSubmitSpinner(true);

    if (form.current.checkValidity() === false) {
      setShowSubmitSpinner(false);
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
      history.push("/success");
    } catch (error) {
      console.error(`Failed to register contact: ${error}`);
    }
    setShowSubmitSpinner(false);
  }

  window.handleSubmit = handleSubmit;

  let spinner;
  if (showSubmitSpinner) {
    spinner = <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />;
  } else {
    spinner = <span/>;
  }

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
              <option>18-21</option>
              <option>22-25</option>
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
        <Col xs={2}>
          <Form.Group as={Col} controlId="formGridCountryCode">
            <Form.Label>Ölkə Kodu</Form.Label>
            <Form.Select required name="countryCode" value={formState.countryCode} onChange={handleChange}>
              <option></option>
              <option>+994</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                            Zəhmət olmasa ölkə kodu seçin.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Telefon Nömrəniz</Form.Label>
            <Form.Control required pattern={phoneNumberValidation.pattern} type="text" name="phoneNumber"
              placeholder="Telefon Nömrəniz"
              value={formState.phoneNumber} onKeyDown={handlePhoneNumberChange} readOnly={phoneNumberReadOnly}
              onChange={handleChange}/>
            <Form.Control.Feedback type="invalid">
              {phoneNumberValidation.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={4}>
          <Form.Group as={Col} controlId="locality">
            <Form.Label>Hansı rayon/şəhər/kənd&apos;də qalırsınız? Əgər Bakı qalırsanız xahiş edirik rayon
                            adı yazın</Form.Label>
            <Form.Control required ref={provinceElement} type="text" name="province"
              onChange={handleChange}/>
            <Form.Control.Feedback type="invalid">
                            Zəhmət olmasa etibarlı bir əyalət göstərin.
            </Form.Control.Feedback>
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
        <Form.Group as={Col} controlId="formGridStreet">
          <Form.Label>Ünvanınız</Form.Label>
          <Form.Control type="text" name="street" placeholder="Əv ünvanınız"
            value={formState.street} onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className="mb-3" id="formGridAgeConfirmation">
          <Form.Check required type="checkbox" name="ageConfirmation" id="age-confirmation"
            label="o Yaşım 18-dən yuxarıdır" value={formState.ageConfirmation}
            onChange={handleChange}
            feedback="Təqdim etməzdən əvvəl 18 yaşdan yuxarı olduğunuzu təsdiq etməlisiniz"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col xs={3}>
          <Button className="g-recaptcha" data-sitekey={process.env.REACT_APP_APP_CHECK_PUBLIC_KEY}
            data-callback="handleSubmit" variant="primary" type="submit">
            {spinner} Submit
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
