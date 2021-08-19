import { Author } from "./Author";
import { MeetingPoint } from "./MeetingPoint";
import { Photo } from "./Photo";

export interface Travel {
  authors: Author[];
  date: Date;
  description: string;
  hour: string;
  id_travel: string;
  latitude: string;
  longitude: string;
  location: string;
  meetingpoint: MeetingPoint;
  photos: Photo[];
  title: string;
}
