import { Author } from "./Author_";
import { MeetingPoint } from "./MeetingPoint_";
import { Photo } from "./Photo_";

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
