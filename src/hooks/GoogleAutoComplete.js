import {useEffect, useState} from "react";

function useGoogleAutoComplete(provinceElement) {
  const [placeItems, setPlaceItems] = useState(undefined);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(provinceElement.current, {
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
        "administrative_area_level_2": "short_name",
      };
      const getAddressComp = function(type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return "";
      };

      const province = getProvinceData(getAddressComp("administrative_area_level_2"),
          getAddressComp("locality"));
      provinceElement.current.value = province;

      setPlaceItems({
        province: province,
        country: getAddressComp("country"),
      });
    }
  }, [provinceElement]);

  return placeItems;
}

function getProvinceData(adminArea2, locality) {
  return adminArea2 !== "" ? adminArea2 : locality;
}

export default useGoogleAutoComplete;
