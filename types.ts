export interface Chirp {
  id: number;
  username: string;
  displayName: string;
  photo: string;
  date: Date;
  message: string;
  // media: [{type: string, url: string}] // make type enum?
}
