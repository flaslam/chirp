export interface Chirp {
  id: string;
  username: string;
  displayName: string;
  photo: string;
  date: Date;
  time: string;
  message: string;
  media?: string[]; // make type with enum?
  replies?: Chirp[];
  reposts?: Chirp[];
  likes?: User[] | string[];
  parent?: Chirp;
}

export interface User {
  username: string;
  displayName: string;
  photo: string;
  joinDate: string;

  followers: User[];
  following: User[];

  header?: string;
  bio?: string;
  location?: string;
  url?: string;
}

export enum PostDisplayType {
  Main,
  Timeline,
}

export enum ComposeType {
  Post,
  Reply,
}
