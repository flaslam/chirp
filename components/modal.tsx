import { createElement, useState } from "react";

interface ModalProps {
  children?: JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const childProps = { setOpenDialog: setOpenDialog };

  return (
    <>
      {props.children}
      {props.children
        ? null
        : // ? createElement(React.isValidElement(props.children), childProps)
          null}
    </>
  );
};

export default Modal;
