import { useContext } from "react";
import { MessageContext } from "../store/message";

const Message = () => {
  const { message } = useContext(MessageContext);

  return (
    <>
      <div
        className="toast-container position-fixed"
        style={{ top: "50px", right: "10px" }}
      >
        <div
          className={`toast show fade-in ${
            message.title ? "opacity-1" : "opacity-0"
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="3000"
        >
          <div className={`toast-header text-white bg-${message.type}`}>
            <strong className="me-auto">{message.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              disabled={!message.title}
            />
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
