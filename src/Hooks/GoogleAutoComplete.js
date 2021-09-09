import {useEffect, useState} from "react";

function useGoogleAutoComplete(cityElement) {
  const [placeItems, setPlaceItems] = useState(undefined);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(cityElement.current, {
      componentRestrictions: {country: ["aze"]},
      fields: ["address_components"],
      types: ["(regions)"],
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      populatePlaceItems(place);
    });

    function populatePlaceItems(place) {
      const addressNameFormat = {
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
      cityElement.current.value = getAddressComp("locality");
      setPlaceItems({
        city: getAddressComp("locality"),
        area: getAddressComp("sublocality_level_1"),
        country: getAddressComp("country"),
      });
    }
  }, [cityElement]);

  return placeItems;
}

export default useGoogleAutoComplete;
