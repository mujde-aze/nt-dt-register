import {reformatPhoneNumber} from "../utilities/Helper";

describe("Reformatting the phone number", () => {
  it("Should return 12- if 12 is supplied for country code +994", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+994", "12");
    expect(reformattedPhoneNumber.phoneNumber).toBe("12-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 12-321- if 12-321 is supplied for country code +994", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+994", "12-321");
    expect(reformattedPhoneNumber.phoneNumber).toBe("12-321-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 12-321-1234 if 12-321-1234 is supplied for country code +994", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+994", "12-321-1234");
    expect(reformattedPhoneNumber.phoneNumber).toBe("12-321-1234");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeTruthy();
  });

  it("Should return 123- if 123 is supplied for country code +995", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+995", "123");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 123-321- if 12-321 is supplied for country code +995", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+995", "123-321");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-321-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 123-321-123 if 12-321-123 is supplied for country code +995", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+995", "123-321-123");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-321-123");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeTruthy();
  });

  it("Should return 123- if 123 is supplied for country code +90", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+90", "123");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 123-321- if 12-321 is supplied for country code +90", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+90", "123-321");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-321-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 123-321-12 if 12-321-12- is supplied for country code +90", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+90", "123-321-12");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-321-12-");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeFalsy();
  });

  it("Should return 123-321-12-12 if 12-321-12-12 is supplied for country code +90", () => {
    const reformattedPhoneNumber = reformatPhoneNumber("+90", "123-321-12-12");
    expect(reformattedPhoneNumber.phoneNumber).toBe("123-321-12-12");
    expect(reformattedPhoneNumber.maxDigitsReached).toBeTruthy();
  });
});
