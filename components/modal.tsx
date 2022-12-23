import { Dialog } from "@mui/material";
import { createElement, ReactElement, useState } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
  children?: JSX.Element;
  render: React.FC<any>;
  // render: ReactElement<any>;
  fullWidth?: boolean;
  title?: string;
  topRow?: boolean;
  data?: any;
}

type ChildProps = {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({
  children,
  render,
  fullWidth,
  topRow,
  title,
  data,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const childProps = { setOpenDialog, data };

  return (
    <>
      {!children ? null : (
        <>
          {/* Button or prompt to open*/}
          <div onClick={() => setOpenDialog(true)}>{children}</div>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            fullWidth={fullWidth ? fullWidth : false}
          >
            {!topRow ? null : (
              <div className="flex items-center justify-center px-4 pt-4 text-lg">
                <div className="grow font-bold">{title ? title : null}</div>
                <div
                  className="m-auto cursor-pointer rounded-full p-1 text-xl hover:bg-gray-200"
                  onClick={() => setOpenDialog(false)}
                >
                  <HiX />
                </div>
              </div>
            )}

            {/* {(render.props = { ...render.props, childProps })} */}
            {/* {render} */}
            <div className="py-4">
              {createElement<ChildProps>(render, childProps)}
            </div>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Modal;
