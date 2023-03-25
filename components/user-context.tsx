import { createContext } from "react";

interface UserContextInterface {
  // TODO: set this to an object of type User, store more values
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);
