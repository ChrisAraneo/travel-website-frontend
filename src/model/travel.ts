import { Author } from "./author";
import { MeetingPoint } from "./meetingpoint";
import { Photo } from "./photo";

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
