import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { UploadedPhoto } from "../../model/UploadedPhoto_";
import { InputResetRef } from "../../types/InputResetRef";
import { Valid } from "../../types/Valid";

interface Props {
  label: string;
  buttonText: string;
  errorMessage: string;
  complete: (photos?: UploadedPhoto[]) => void;
}

const InputPhotos: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
    const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
    const [valid, setValid] = useState<Valid>(Valid.NotValidated);
    const [readerErrorMessage, setReaderErrorMessage] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files ?? [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) {
          continue;
        }

        const reader = new FileReader();
        reader.onload = () => {
          addPhoto(file.name, reader.result);
        };
        reader.onerror = () => {
          setReaderErrorMessage(JSON.stringify(reader.error?.message));
          setValid(Valid.Invalid);
        };
        reader.readAsDataURL(file);
      }
    };

    const addPhoto = (name: string, base64: string | ArrayBuffer | null) => {
      const isPhotoInTheList =
        photos.findIndex((photo: UploadedPhoto) => photo.name === name) !== -1;
      if (isPhotoInTheList) {
        return;
      }

      const photosAfterAdding = [...photos, { name, base64 }];
      setPhotos(photosAfterAdding);
      validate(photosAfterAdding);
    };

    const removePhoto = (photoToRemove: UploadedPhoto) => {
      const photosAfterRemoving = photos.filter(
        (item: UploadedPhoto) => item.name !== photoToRemove.name
      );
      setPhotos(photosAfterRemoving);
      validate(photosAfterRemoving);
    };

    const validate = (photos: UploadedPhoto[]) => {
      const isValid = photos.length > 0;
      const photosOrUndefined = isValid ? photos : undefined;
      setValid(isValid ? Valid.Valid : Valid.Invalid);
      props.complete(photosOrUndefined);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setPhotos([]);
        setValid(Valid.NotValidated);
      },
    }));

    return (
      <div className="field">
        <label className="label">{props.label}</label>
        {photos.length > 0 ? (
          <div style={{ marginBottom: ".75em" }}>
            <ul
              className="list"
              style={{ boxSizing: "border-box", border: "1px solid #48c774" }}
            >
              {photos.map((item: UploadedPhoto, index: number) => (
                <li
                  key={`${item.name}:${index}`}
                  className="list-item"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.name}
                  <a
                    className="delete is-small"
                    style={{ display: "block", lineHeight: "18px" }}
                    onClick={() => removePhoto(item)}
                  ></a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="control has-icons-left">
          <div className={`file ${valid === Valid.Invalid ? "is-danger" : ""}`}>
            <label className="file-label">
              <input className="file-input" type="file" onChange={onChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">{props.buttonText}</span>
              </span>
            </label>
          </div>
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>
        {valid === Valid.Invalid ? (
          <p className="help is-danger">{props.errorMessage}</p>
        ) : null}
        {valid === Valid.Invalid && readerErrorMessage.length > 0 ? (
          <p className="help is-danger">{readerErrorMessage}</p>
        ) : null}
      </div>
    );
  }
);

export default InputPhotos;
