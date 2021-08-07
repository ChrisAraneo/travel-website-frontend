import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Valid } from "../../model/valid";

// TODO -- A co jeśli nie wybierze się lokacji????

type LocationQueryResult = {
  place_id: any;
  address: {
    country: any;
  };
  lat: any;
  lon: any;
  display_name: string;
};

interface Props {
  label: string;
  icon: IconProp;
  errorMessage: string;
  complete: (
    validLocationString?: string,
    validLatitude?: number,
    validLongitude?: number
  ) => any;
}

const InputLocation: React.FC<Props> = (props: Props) => {
  const [searchString, setSearchString] = useState<string>("");
  const [locationString, setLocationString] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string>("");
  const [valid, setValid] = useState<Valid>(Valid.NotValidated);

  useEffect(() => {
    if (valid === Valid.Valid) {
      props.complete(locationString, Number(latitude), Number(longitude));
    }
  }, [valid]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event?.target?.value ?? "";
    setSearchString(searchString);
  };

  const onClickChangeButton = (event: SyntheticEvent) => {
    event.preventDefault();
    resetState();
  };

  const onClickSelectItem = (
    event: SyntheticEvent,
    item: LocationQueryResult
  ) => {
    event.preventDefault();

    setLocationString(String(item.address.country));
    setLatitude(Number(item.lat));
    setLongitude(Number(item.lon));
    setResults([]);

    validate(searchString, latitude, longitude);
  };

  const resetState = () => {
    setLocationString("");
    setLatitude(null);
    setLongitude(null);
    props.complete();
    setValid(Valid.NotValidated);
  };

  const fetchLocations = (event: SyntheticEvent) => {
    event.preventDefault();

    fetch(
      `http://nominatim.openstreetmap.org/search?q=${searchString}&addressdetails=1&format=json`,
      { method: "GET" }
    )
      .then((httpResponse) => httpResponse.json())
      .then((response) => setResults(response))
      .catch((error) => {
        setValid(Valid.Invalid);
        setFetchErrorMessage(JSON.stringify(error.message));
      });
  };

  const validate = (locationString: any, latitude: any, longitude: any) => {
    const isLocationStringValid = locationString?.length > 0;
    const isLatitudeValid = latitude !== null && !isNaN(latitude);
    const isLongitudeValid = longitude !== null && !isNaN(longitude);
    const isValid =
      isLocationStringValid && isLatitudeValid && isLongitudeValid;
    setValid(isValid ? Valid.Valid : Valid.Invalid);
  };

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      {locationString.length < 1 ? (
        <div>
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                className={`input ${
                  valid === Valid.Invalid ? "is-danger" : ""
                }`}
                type="text"
                value={searchString}
                onChange={onChange}
              />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={fetchLocations}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          {valid === Valid.Invalid ? (
            <p className="help is-danger">{props.errorMessage}</p>
          ) : null}
          {valid === Valid.Invalid && fetchErrorMessage.length > 0 ? (
            <p className="help is-danger">{fetchErrorMessage}</p>
          ) : null}
        </div>
      ) : (
        <div className="field is-grouped">
          <div className="control is-expanded has-icons-left">
            <input
              className="input is-success"
              type="text"
              value={locationString}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={props.icon} />
            </span>
          </div>
          <div className="control">
            <button className="button" onClick={onClickChangeButton}>
              Zmień
            </button>
          </div>
        </div>
      )}
      {results.length > 0 ? (
        <div style={{ marginBottom: ".75em" }}>
          <ul className="list">
            {results.map((item: LocationQueryResult) => (
              <li key={item.place_id} className="list-item">
                <a
                  onClick={(event) => onClickSelectItem(event, item)}
                >{`${item.display_name}`}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default InputLocation;
