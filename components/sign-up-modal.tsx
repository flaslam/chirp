import { Dialog } from "@mui/material";
import { useState } from "react";
import LogIn from "./log-in";
import SignUp from "./sign-up";

interface SignUpModalProps {
  children?: JSX.Element;
}

const SignUpModal: React.FC<SignUpModalProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setOpenDialog(true)}>{props.children}</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <SignUp setOpenDialog={setOpenDialog} />
      </Dialog>
    </>
  );
};

export default SignUpModal;
