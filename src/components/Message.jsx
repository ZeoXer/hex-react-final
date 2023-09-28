import { useState } from "react";

const Message = () => {
  const [message, setMessage] = useState({});

  return (
    <>
      <button
        onClick={() => {
          setMessage({
            type: "danger",
            title: "成功",
            text: "這是一段成功的訊息",
          });
        }}
      >
        按我
      </button>
      <div
        className="toast-container position-fixed"
        style={{ top: "50px", right: "10px" }}
      >
        {message.title && (
          <div
            className="toast show"
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
              />
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
