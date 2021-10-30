import {getCountryCodeConstraints} from "../utilities/Helper";

describe("Retrieving the correct phone number pattern based on country code", () => {
  it("Should match the number 12-321-1234 if the country code is +994", () => {
    const countryCodeConstraint = getCountryCodeConstraints("+994");
    const pattern = new RegExp(countryCodeConstraint.pattern);
    expect("12-321-1234").toMatch(pattern);
  });

  it("Should not match the number 12-321 if the country code is +994", () => {
    const countryCodeConstraint = getCountryCodeConstraints("+994");
    const pattern = new RegExp(countryCodeConstraint.pattern);
    expect("12-321").not.toMatch(pattern);
  });

  it("Should match the number 123-321-123 if the country code is +995", () => {
    const countryCodeConstraint = getCountryCodeConstraints("+995");
    const pattern = new RegExp(countryCodeConstraint.pattern);
    expect("123-321-123").toMatch(pattern);
  });

  it("Should not match the number 123-321-12 if the country code is +995", () => {
    const countryCodeConstraint = getCountryCodeConstraints("+995");
    const pattern = new RegExp(countryCodeConstraint.pattern);
    expect("123-321-12").not.toMatch(pattern);
  });

  it("Should not match the number 123-321-12 if the country code is +90", () => {
    const countryCodeConstraint = getCountryCodeConstraints("+90");
    const pattern = new RegExp(countryCodeConstraint.pattern);
    expect("123-321-12").not.toMatch(pattern);
  });
});
