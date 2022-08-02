import { Dialog } from "@mui/material";
import { useState } from "react";
import LogIn from "./log-in";

interface LogInModalProps {
  children?: JSX.Element;
}

const LogInModal: React.FC<LogInModalProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setOpenDialog(true)}>{props.children}</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <LogIn setOpenDialog={setOpenDialog} />
      </Dialog>
    </>
  );
};

export default LogInModal;
