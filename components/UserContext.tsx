import { createContext } from "react";
interface UserContextInterface {
  // TODO: set this to an object of type User, store more values
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}
export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);
