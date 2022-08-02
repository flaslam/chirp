import LogIn from "./log-in";
import SignUp from "./sign-up";
import LogOut from "./log-out";
import { BlueLargeButton } from "./Styled/Buttons";
import { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { UserContext } from "./user-context";

const SidebarRight = () => {
  const { user } = useContext(UserContext);

  const [openLogInDialog, setOpenLogInDialog] = useState<boolean>(false);
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
          <BlueLargeButton onClick={() => setOpenLogInDialog(true)}>
            Log In
          </BlueLargeButton>
          <BlueLargeButton onClick={() => setOpenSignUpDialog(true)}>
            Sign Up
          </BlueLargeButton>
        </>
      )}

      <Dialog open={openLogInDialog} onClose={() => setOpenLogInDialog(false)}>
        <LogIn setOpenLogInDialog={setOpenLogInDialog} />
      </Dialog>
      <Dialog
        open={openSignUpDialog}
        onClose={() => setOpenSignUpDialog(false)}
      >
        <SignUp setOpenSignUpDialog={setOpenSignUpDialog} />
      </Dialog>
    </div>
  );
};

export default SidebarRight;
