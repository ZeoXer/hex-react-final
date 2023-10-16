import ReactLoading from "react-loading";

export const LoadingFullScreen = () => {
  return (
    <div
      className="position-fixed top-0 bottom-0 start-0 end-0 bg-gray opacity-75 d-flex justify-content-center align-items-center"
      style={{ zIndex: 10000, backdropFilter: "blur(3px)" }}
    >
      <ReactLoading type="cylon" color="white" height={50} width={150} />
    </div>
  );
};

export const LoadingButton = () => {
  return <ReactLoading type="cylon" color="white" height={60} />;
};
