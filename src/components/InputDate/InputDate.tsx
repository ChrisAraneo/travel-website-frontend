import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import { Valid } from "../../model/valid";

interface Props {
  label: string;
  errorMessage: string;
  complete: (dateString?: string) => any;
}

const InputDate: React.FC<Props> = (props: Props) => {
  const [valid, setValid] = useState<Valid>(Valid.NotValidated);
  const [dateString, setDateString] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event?.target?.value ?? "";
    setDateString(dateString);
    if (valid === Valid.Invalid || valid === Valid.Valid) {
      validate(dateString);
    }
  };

  const validate = (dateString: any) => {
    const isValid = typeof dateString === "string" && dateString.length === 10;
    const dateStringOrUndefined = isValid ? dateString : undefined;
    setValid(isValid ? Valid.Valid : Valid.Invalid);
    props.complete(dateStringOrUndefined);
  };

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control has-icons-left">
        <input
          className={`input ${
            valid === Valid.Valid
              ? "is-success"
              : valid === Valid.Invalid
              ? "is-danger"
              : ""
          }`}
          value={dateString}
          type="date"
          onChange={onChange}
          onBlur={() => validate(dateString)}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faCalendar} />
        </span>
      </div>
      {valid == Valid.Invalid && (
        <p className="help is-danger">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default InputDate;
