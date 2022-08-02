interface ModalProps {
  children?: JSX.Element;
}

const Modal: React.FC<ModalProps> = (props) => {
  return <div>{props.children}</div>;
};

export default Modal;
