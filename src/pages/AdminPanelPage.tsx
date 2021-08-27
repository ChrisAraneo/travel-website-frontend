import React from "react";
import FormCreateAuthor from "../components/FormCreateAuthor/FormCreateAuthor";
import FormCreateMeetingPoint from "../components/FormCreateMeetingPoint/FormCreateMeetingPoint";
import FormCreateTravel from "../components/FormCreateTravel/FormCreateTravel";
import FormCreateUser from "../components/FormCreateUser/FormCreateUser";
import Title from "../components/Title/Title";
import { Author } from "../model/Author_";
import { MeetingPoint } from "../model/MeetingPoint_";

const checkIfHasAdminPermissions = (username?: string) => username === "admin";

interface Props {
  username: string;
  token: string;
  meetingPoints: MeetingPoint[];
  authors: Author[];
  children?: any;
}

const AdminPanelPage: React.FC<Props> = (props: Props) => (
  <>
    {checkIfHasAdminPermissions(props.username) ? (
      <div>
        <header
          className="box"
          style={{ maxWidth: "100%", marginLeft: "auto", marginRight: "auto" }}
        >
          <Title>{`Zalogowano jako ${props.username}`}</Title>
        </header>
        <FormCreateUser token={props.token} />
        <FormCreateAuthor token={props.token} />
        <FormCreateMeetingPoint token={props.token} />
        <FormCreateTravel
          token={props.token}
          meetingPoints={props.meetingPoints}
          authors={props.authors}
        />
        {props.children}
      </div>
    ) : (
      <div className="box">
        <h1 className="title">Niestety nie jesteś zalogowany jako admin</h1>
      </div>
    )}
  </>
);

export default AdminPanelPage;
