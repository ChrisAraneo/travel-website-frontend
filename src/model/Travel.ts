import { Author } from "./Author";
import { MeetingPoint } from "./MeetingPoint";
import { Photo } from "./Photo";

export interface Travel {
  id_travel: string;
  title: string;
  location: string;
  date: Date;
  hour: string;
  id_meetingpoint: string;
  latitude: string;
  longitude: string;
  description: string;
  meetingpoint?: MeetingPoint;
  authors?: Author[];
  photos?: Photo[];
}
