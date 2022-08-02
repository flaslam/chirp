import LogIn from "./log-in";
import SignUp from "./sign-up";
import LogOut from "./log-out";
import { BlueLargeButton } from "./Styled/Buttons";
import { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { UserContext } from "./user-context";
import LogInModal from "./log-in-modal";
import SignUpModal from "./sign-up-modal";

const SidebarRight = () => {
  const { user } = useContext(UserContext);

  const [openSignUpDialog, setOpenSignUpDialog] = useState<boolean>(false);

  return (
    <div className="lg:w-1/8 hidden w-1/4 flex-col p-4 xl:flex xl:w-1/6">
      {/* invisible md:visible */}
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
