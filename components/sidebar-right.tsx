import { useContext } from "react";
import { UserContext } from "./user-context";
import LogIn from "./log-in";
import SignUp from "./sign-up";
import Modal from "./modal";
import LogOut from "./log-out";
import { BlueLargeButton } from "./styled/button-styles";

const SidebarRight = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="lg:w-1/8 sticky top-0 block hidden h-screen w-1/4 flex-col p-4 xl:flex xl:w-1/6">
      {user ? (
        <LogOut>
          <BlueLargeButton>Log Out</BlueLargeButton>
        </LogOut>
      ) : (
        <>
          <Modal render={LogIn}>
            <BlueLargeButton>Log In</BlueLargeButton>
          </Modal>

          <Modal render={SignUp}>
            <BlueLargeButton>Sign Up</BlueLargeButton>
          </Modal>
        </>
      )}
    </div>
  );
};

export default SidebarRight;
