import ReactDOM from "react-dom";

const PortalModal = ({ children }) => {
  return ReactDOM.createPortal(children, document.querySelector("#modal-root"));
};

export default PortalModal;
