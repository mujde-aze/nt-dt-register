import {useState} from "react";
import {Loader} from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function useGoogleAutoComplete(streetElement) {
  const [placeItems, setPlaceItems] = useState(undefined);
  const [autoCompleteLoaded, setAutoCompleteLoaded] = useState(false);

  if (!autoCompleteLoaded && streetElement.current) {
    loader.load()
        .then((google) => {
          const autocomplete = new google.maps.places.Autocomplete(streetElement.current, {
            componentRestrictions: {country: ["aze"]},
            fields: ["address_components", "geometry"],
            types: ["address"],
          });
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            populatePlaceItems(place);
          });

          function populatePlaceItems(place) {
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

            setPlaceItems({street: getAddressComp("street_number") + " " + getAddressComp("route"),
              city: getAddressComp("locality"),
              area: getAddressComp("sublocality_level_1"),
              country: getAddressComp("country"),
            });
          }

          setAutoCompleteLoaded(true);
        }).catch((e) => {
          console.error(`Failed to load autocomplete: ${e}`);
        });
  }

  return placeItems;
}

export default useGoogleAutoComplete;
