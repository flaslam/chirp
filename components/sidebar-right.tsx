import { useContext } from "react";
import { UserContext } from "./user-context";
import LogInModal from "./log-in-modal";
import SignUpModal from "./sign-up-modal";
import LogOut from "./log-out";
import { BlueLargeButton } from "./Styled/Buttons";

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
          <LogInModal>
            <BlueLargeButton>Log In</BlueLargeButton>
          </LogInModal>

          <SignUpModal>
            <BlueLargeButton>Sign Up</BlueLargeButton>
          </SignUpModal>
        </>
      )}
    </div>
  );
};

export default SidebarRight;
