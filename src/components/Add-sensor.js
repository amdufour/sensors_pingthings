import AddIcon from "../assets/Add-icon";

const AddSensor = props => {
  
  const buttonClickHandler = () => {
    props.clickAddHandler();
  };

  return (
    <button 
      className="add"
      onClick={buttonClickHandler}
    >
      <span className="button-icon">
        <AddIcon />
      </span>
      <span className="button-text">Add a sensor</span>
    </button>
  );
};

export default AddSensor;