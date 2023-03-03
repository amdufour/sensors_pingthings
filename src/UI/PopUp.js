const PopUp = props => {
  return (
    <div className="popup-container">
      <div className="popup">{props.children}</div>
    </div>
  );
};

export default PopUp;