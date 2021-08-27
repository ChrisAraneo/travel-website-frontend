import {
  faComment,
  faFlag,
  faGlobe,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config/config";
import { Author } from "../../model/Author_";
import { MeetingPoint } from "../../model/MeetingPoint_";
import { UploadedPhoto } from "../../model/UploadedPhoto_";
import { InputResetRef } from "../../types/InputResetRef";
import Form from "../Form/Form";
import InputDate, { validateDate } from "../InputDate/InputDate";
import InputList from "../InputList/InputList";
import InputLocation, {
  validateLocationString,
} from "../InputLocation/InputLocation";
import InputPhotos from "../InputPhotos/InputPhotos";
import InputSelect from "../InputSelect/InputSelect";
import InputText from "../InputText/InputText";
import InputTime, { validateTime } from "../InputTime/InputTime";

interface Props {
  authors: Author[];
  meetingPoints: MeetingPoint[];
  token: string;
}

const FormCreateTravel = (props: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [locationString, setLocationString] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [dateString, setDateString] = useState<string>("");
  const [timeString, setTimeString] = useState<string>("");
  const [meetingPointId, setMeetingPointId] = useState<number>(-1);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<UploadedPhoto[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const titleInputRef = useRef<InputResetRef>(null);
  const locationInputRef = useRef<InputResetRef>(null); // TODO RESZTA INPUT REFÓW DO ZROBIENIA;
  const meetingPointInputRef = useRef<InputResetRef>(null);
  const dateStringInputRef = useRef<InputResetRef>(null);
  const timeStringInputRef = useRef<InputResetRef>(null);
  const selectedAuthorsInputRef = useRef<InputResetRef>(null);
  const selectedPhotosInputRef = useRef<InputResetRef>(null);
  // const addressStringInputRef = useRef<InputResetRef>(null);

  useEffect(() => {
    if (isSubmitted) {
      createTravel(
        title,
        locationString,
        dateString,
        timeString,
        meetingPointId,
        latitude,
        longitude,
        description,
        selectedAuthors,
        selectedPhotos,
        props.token
      )
        .then(() => setIsSubmitted(false))
        .catch((error: any) => {
          if (isSuccess) {
            setIsSuccess(false);
            setMessage(JSON.stringify(error));
          } else {
            setMessage(`${message}  ${error.message}`);
          }
          setIsSubmitted(false);
        });
    }
  }, [isSubmitted]);

  const createAuthorGroup = async (
    authors: Author[],
    travelId: string,
    token: string
  ) => {
    authors.forEach(async (author) => {
      const formData = new FormData();
      formData.append("id_author", author.id_author);
      formData.append("id_travel", travelId);
      formData.append("token", token);

      await fetch(`${config.url}/api/post/authorgroup.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => null)
        .catch((error: { message?: string }) => {
          if (isSuccess) {
            setIsSuccess(false);
            setMessage(JSON.stringify(error));
          } else {
            setMessage(`${message}  ${error.message}`);
          }
        });
    });
  };

  const createPhotos = async (
    photos: UploadedPhoto[],
    travelId: string,
    token: string
  ) => {
    photos.forEach(async (photo) => {
      const formData = new FormData();
      formData.append("base64", String(photo.base64));
      formData.append("id_travel", travelId);
      formData.append("token", token);

      await fetch(`${config.url}/api/post/photo.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          if (isSuccess) {
            setIsSuccess(false);
            setMessage(JSON.stringify(error));
          } else {
            setMessage(`${message}  ${error.message}`);
          }
        });
    });
  };

  const createTravel = async (
    title: string,
    locationString: string,
    dateString: string,
    timeString: string,
    meetingPointId: number,
    latitude: number,
    longitude: number,
    description: string,
    authors: Author[],
    photos: UploadedPhoto[],
    token: string
  ) => {
    const isValid = validate(
      title,
      locationString,
      dateString,
      timeString,
      meetingPointId,
      latitude,
      longitude,
      authors,
      photos
    );

    if (!isValid) {
      return false;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", locationString);
    formData.append("date", dateString);
    formData.append("hour", timeString);
    formData.append("id_meetingpoint", String(meetingPointId));
    formData.append("latitude", String(latitude));
    formData.append("longitude", String(longitude));
    formData.append("description", description ?? " ");
    formData.append("token", token);

    await fetch(`${config.url}/api/post/travel.php`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (result) => {
        const travelId = String(result.id_travel);

        await createAuthorGroup(selectedAuthors, travelId, token);
        await createPhotos(selectedPhotos, travelId, token);

        const isSuccess = result.success;
        const message = result.message;
        setIsSuccess(isSuccess);
        setMessage(message);

        if (isSuccess) {
          resetForm();
        }
      })
      .catch((error: any) => {
        setIsSuccess(false);
        setMessage(String(error));
      });
  };

  const validateTitle = (text?: string) =>
    typeof text === "string" && text.length > 5;

  const validateNumber = (number?: any) => !isNaN(Number(number));

  const validateMeetingPointId = (number?: any) =>
    validateNumber(number) && number >= 0;

  const validateAuthors = (authors?: Author[]) =>
    Array.isArray(authors) &&
    authors.length > 0 &&
    authors
      .map(
        (author) =>
          author.id_author !== null &&
          author.id_author !== undefined &&
          author.firstname &&
          author.lastname
      )
      .findIndex((isValidAuthor) => isValidAuthor === false) === -1;

  const validatePhotos = (photos?: UploadedPhoto[]) =>
    Array.isArray(photos) &&
    photos.length > 0 &&
    photos
      .map((photo) => !!(photo.name && photo.base64))
      .findIndex((isValidPhoto) => isValidPhoto === false) === -1;

  const validate = (
    title?: string,
    locationString?: string,
    dateString?: string,
    timeString?: string,
    meetingPointId?: number,
    latitude?: number,
    longitude?: number,
    authors?: Author[],
    photos?: UploadedPhoto[]
  ) => {
    const validations: [boolean, string][] = [
      [validateTitle(title), "Tytuł prelekcji jest za krótki."],
      [validateLocationString(locationString), "Wybierz miejsce podróży."],
      [validateDate(dateString), "Wybierz datę spotkania."],
      [validateTime(timeString), "Wybierz godzinę spotkania."],
      [validateMeetingPointId(meetingPointId), "Wybierz miejsce spotkania."],
      [validateNumber(latitude), "Wybierz miejsce podróży."],
      [validateNumber(longitude), "Wybierz miejsce podróży."],
      [validateAuthors(authors), "Wybierz przynajmniej jednego prelegenta."],
      [validatePhotos(photos), "Wybierz przynajmniej jedno zdjęcie z podróży."],
    ];

    for (const [isValid, errorMessage] of validations) {
      if (!isValid) {
        setIsSuccess(false);
        setMessage(errorMessage);
        return false;
      }
    }

    return true;
  };

  const resetForm = () => {
    titleInputRef.current?.reset();
    locationInputRef.current?.reset();
    meetingPointInputRef.current?.reset();
    dateStringInputRef.current?.reset();
    timeStringInputRef.current?.reset();
    selectedAuthorsInputRef.current?.reset();
    selectedPhotosInputRef.current?.reset();
    setDescription("");
  };

  return (
    <Form
      title="Dodaj stronę prelekcji"
      isSuccess={isSuccess}
      message={message}
      buttonText="Dodaj stronę prelekcji"
      action={() => setIsSubmitted(true)}
    >
      <InputText
        ref={titleInputRef}
        label="Tytuł prelekcji"
        icon={faFlag}
        validation={validateTitle}
        errorMessage="Tytuł prelekcji jest za krótki."
        complete={(text) => setTitle(text ?? "")}
      />

      <InputLocation
        ref={locationInputRef}
        label="Kraj podróży"
        icon={faGlobe}
        errorMessage="Wybierz kraj podróży"
        complete={(
          location?: string,
          latitude?: number,
          longitude?: number
        ) => {
          setLocationString(location ?? "");
          setLatitude(latitude ?? 0);
          setLongitude(longitude ?? 0);
        }}
      />

      <InputSelect
        ref={meetingPointInputRef}
        label="Wybierz miejsce spotkania"
        items={props.meetingPoints}
        nameProperty="name"
        valueProperty="id_meetingpoint"
        icon={faHome}
        complete={(id) => setMeetingPointId(id ?? -1)}
        errorMessage="Wybierz miejsce spotkania."
      />

      <div className="columns" style={{ marginBottom: 0 }}>
        <div className="column" style={{ paddingBottom: 0 }}>
          <InputDate
            ref={dateStringInputRef}
            label="Dzień spotkania"
            complete={(text) => setDateString(text ?? "")}
            errorMessage="Wybierz dzień spotkania"
          />
        </div>
        <div className="column">
          <InputTime
            ref={timeStringInputRef}
            label="Godzina spotkania"
            complete={(text) => setTimeString(text ?? "")}
            errorMessage="Wybierz godzinę spotkania."
          />
        </div>
      </div>

      <InputList
        ref={selectedAuthorsInputRef}
        label="Prelegenci"
        data={props.authors}
        value="id_author"
        name={(item) => `${item.firstname} ${item.lastname}`}
        icon={faUser}
        buttonText="Dodaj prelegenta"
        errorMessage="Musisz dodać przynajmniej jednego prelegenta."
        complete={(data) => setSelectedAuthors(data ?? [])}
      />

      <InputPhotos
        ref={selectedPhotosInputRef}
        label="Zdjęcia"
        buttonText="Dodaj zdjęcie"
        complete={(photos?) => setSelectedPhotos(photos ?? [])}
        errorMessage="Dodaj przynajmniej jedno zdjęcie z podróży."
      />

      <div className="field">
        <label className="label">Opis prelekcji (opcjonalnie)</label>
        <div className="control has-icons-left">
          <textarea
            className="textarea"
            value={description}
            cols={40}
            rows={5}
            onChange={(event) => setDescription(event?.target?.value ?? " ")}
            style={{ minHeight: "120px" }}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faComment} />
          </span>
        </div>
      </div>
    </Form>
  );
};

export default FormCreateTravel;
