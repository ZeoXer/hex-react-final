import { createContext, useReducer } from "react";

const initState = {
  type: "",
  title: "",
  text: "",
};

const MessageContext = createContext();

const actionType = {
  POST_MSEEAGE: "post-message",
  CLEAR_MESSAGE: "clear-message",
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case actionType.POST_MSEEAGE:
      return {
        type: action.payload.type,
        title: action.payload.title,
        text: action.payload.text,
      };
    case actionType.CLEAR_MESSAGE:
      return { ...initState };
    default:
      return state;
  }
};

const MessageContextProvider = ({ children }) => {
  const [message, dispatch] = useReducer(messageReducer, initState);

  const handleSuccessMessage = ((dispatch, res) => {
    dispatch({
      type: actionType.POST_MSEEAGE,
      payload: {
        type: "success",
        title: "操作成功",
        text: res.data.message,
      },
    });

    setTimeout(() => {
      dispatch({ type: actionType.CLEAR_MESSAGE });
    }, 2000);
  }).bind(this, dispatch);

  const handleFailMessage = ((dispatch, error) => {
    const errorMessage = error?.response?.data?.message;

    dispatch({
      type: actionType.POST_MSEEAGE,
      payload: {
        type: "danger",
        title: "操作失敗",
        text: Array.isArray(errorMessage)
          ? errorMessage.join("、")
          : errorMessage,
      },
    });

    setTimeout(() => {
      dispatch({ type: actionType.CLEAR_MESSAGE });
    }, 2000);
  }).bind(this, dispatch);

  const valueToShare = {
    message,
    handleSuccessMessage,
    handleFailMessage,
  };

  return (
    <MessageContext.Provider value={valueToShare}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContextProvider, MessageContext };
