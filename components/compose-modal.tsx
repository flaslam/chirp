import { Dialog } from "@mui/material";
import { useState } from "react";
import Compose from "./compose";
import { HiX } from "react-icons/hi";

interface SignUpModalProps {
  children?: JSX.Element;
}

const ComposeModal: React.FC<SignUpModalProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <>
      <div onClick={() => setOpenDialog(true)}>{props.children}</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        {/* Top row */}
        <div className="flex items-center justify-center px-4 py-4 text-lg">
          <div className="grow font-bold">Compose</div>
          <div
            className="m-auto cursor-pointer rounded-full p-1 text-xl hover:bg-gray-200"
            onClick={() => setOpenDialog(false)}
          >
            <HiX />
          </div>
        </div>
        <Compose setModal={setOpenDialog} />
      </Dialog>
    </>
  );
};

export default ComposeModal;
