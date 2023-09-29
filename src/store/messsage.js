import { createContext } from "react";

export const actionType = {
  POST_MSEEAGE: "post-message",
  CLEAR_MESSAGE: "clear-message",
};

export const initState = {
  type: "",
  title: "",
  text: "",
};

export const MessageContext = createContext({});

export const messageReducer = (state, action) => {
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

export const handleSuccessMessage = (dispatch, res) => {
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
};

export const handleFailMessage = (error, dispatch) => {
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
};
