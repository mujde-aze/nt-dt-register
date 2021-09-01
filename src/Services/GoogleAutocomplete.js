export function initMap() {
  const componentForm = [
    "location",
    "locality",
    "sublocality_level_1",
    "country",
    "street_number",
  ];
  const autocompleteInput = document.getElementById("location");
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    componentRestrictions: {country: ["aze"]},
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  autocomplete.addListener("place_changed", function() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    fillInAddress(place);
  });

  function fillInAddress(place) { // optional parameter
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
    document.getElementById("location").value = getAddressComp("street_number") + " " +
            getAddressComp("route");
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== "location") {
        document.getElementById(component).value = getAddressComp(component);
      }
    }
  }
}
