import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Valid } from "../../model/valid";
import { InputResetRef } from "../../types/InputResetRef";

interface Props {
  label: string;
  icon: IconProp;
  errorMessage: string;
  validation: (password: string) => any;
  complete: (password?: string) => any;
}

const InputPassword: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
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

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValue("");
        setValid(Valid.NotValidated);
      },
    }));

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
  }
);

export default InputPassword;
