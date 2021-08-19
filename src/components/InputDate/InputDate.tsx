import { faCalendar } from "@fortawesome/free-solid-svg-icons";
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

export const validateDate = (dateString: any) =>
  typeof dateString === "string" && dateString.length === 10;

interface Props {
  label: string;
  errorMessage: string;
  complete: (dateString?: string) => any;
}

const InputDate: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
    const [dateString, setDateString] = useState<string>("");
    const [valid, setValid] = useState<Valid>(Valid.NotValidated);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const dateString = event?.target?.value ?? "";
      setDateString(dateString);
      if (valid === Valid.Invalid || valid === Valid.Valid) {
        validate(dateString);
      }
    };

    const validate = (dateString: any) => {
      const isValid = validateDate(dateString);
      const dateStringOrUndefined = isValid ? dateString : undefined;
      setValid(isValid ? Valid.Valid : Valid.Invalid);
      props.complete(dateStringOrUndefined);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setDateString("");
        setValid(Valid.NotValidated);
      },
    }));

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
  }
);

export default InputDate;
