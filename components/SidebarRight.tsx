import styles from "../styles/SidebarRight.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import LogOut from "./LogOut";
import { BlueLargeButton } from "./Styled/Buttons";
import { useContext, useState } from "react";
import { Dialog } from "@mui/material";
import { UserContext } from "./UserContext";
import { CustomDialog } from "./Styled/Dialog";

const SidebarRight = () => {
  const { user } = useContext(UserContext);

  const [openLogInDialog, setOpenLogInDialog] = useState<boolean>(false);
  const [openSignUpDialog, setOpenSignUpDialog] = useState<boolean>(false);

  return (
    <div className="p-4 hidden w-1/4 lg:w-1/8 xl:w-1/6 xl:flex flex-col">
      {/* invisible md:visible */}
      {user ? (
        <LogOut />
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
