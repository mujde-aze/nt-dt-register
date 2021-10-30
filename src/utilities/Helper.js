export function retrieveSocialNetworkSource(url) {
  if (url.includes("google")) {
    return "google";
  }

  if (url.includes("facebook")) {
    return "facebook";
  }

  if (url.includes("tiktok")) {
    return "tiktok";
  }

  return "unknown";
}

export function reformatPhoneNumber(countryCode, currentPhoneNumber) {
  let formattedNumber = currentPhoneNumber;
  let maxDigitsReached = false;
  const phoneNumberDigits = formattedNumber.replace(/(\D|\s+)/g, "").length;
  switch (countryCode) {
    case "+994":
      if (phoneNumberDigits === 2 || phoneNumberDigits === 5) {
        formattedNumber = `${formattedNumber}-`;
      }
      if (phoneNumberDigits === 9) {
        maxDigitsReached = true;
      }
      break;
    case "+995":
      if (phoneNumberDigits === 3 || phoneNumberDigits === 6) {
        formattedNumber = `${formattedNumber}-`;
      }
      if (phoneNumberDigits === 9) {
        maxDigitsReached = true;
      }
      break;
    case "+90":
      if (phoneNumberDigits === 3 || phoneNumberDigits === 6 || phoneNumberDigits === 8) {
        formattedNumber = `${formattedNumber}-`;
      }
      if (phoneNumberDigits === 10) {
        maxDigitsReached = true;
      }
      break;
    default:
      break;
  }

  return {
    phoneNumber: formattedNumber,
    maxDigitsReached: maxDigitsReached,
  };
}
