import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import { Valid } from "../../model/valid";

interface Props {
  label: string;
  icon: IconProp;
  errorMessage: string;
  validation: (password: string) => any;
  complete: (password?: string) => any;
}

const InputPassword: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [valid, setValid] = useState<Valid>(Valid.NotValidated);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value ?? "";
    setValue(value);
    if (valid === Valid.Invalid || valid === Valid.Valid) {
      validate(value);
    }
  };

  const validate = (value: string) => {
    const isValid = props.validation(value);
    const valueOrUndefined = isValid ? value : undefined;
    setValid(isValid ? Valid.Valid : Valid.Invalid);
    props.complete(valueOrUndefined);
  };

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control has-icons-left">
        <input
          className={`input ${
            valid === Valid.NotValidated
              ? ""
              : valid === Valid.Valid
              ? "is-success"
              : "is-danger"
          }`}
          value={value}
          type="password"
          onChange={onChange}
          onBlur={() => validate(value)}
        />
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={props.icon} />
        </span>
      </div>
      {valid === Valid.Invalid && (
        <p className="help is-danger">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default InputPassword;
