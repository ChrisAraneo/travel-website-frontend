import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { InputResetRef } from "../../types/InputResetRef";
import { Valid } from "../../types/Valid";

interface Props {
  label: string;
  icon: IconProp;
  errorMessage: string;
  validation: (value: string) => boolean;
  complete: (value?: string) => any;
}

const InputText: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
    const [valid, setValid] = useState<Valid>(Valid.NotValidated);
    const [value, setValue] = useState<string>("");

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
        setValid(Valid.NotValidated);
        setValue("");
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
            type="text"
            onChange={onChange}
            onBlur={() => validate(value)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={props.icon} />
          </span>
        </div>
        {valid === Valid.Invalid ? (
          <p className="help is-danger">{props.errorMessage}</p>
        ) : null}
      </div>
    );
  }
);

export default InputText;
