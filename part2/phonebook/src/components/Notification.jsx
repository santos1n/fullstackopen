const Notification = ({ type, message }) => {
  if (message === null) {
    return null;
  }

  if (type == "success") {
    return <div className="success">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
