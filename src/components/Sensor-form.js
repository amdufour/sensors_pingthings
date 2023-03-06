import { Fragment, useState } from "react";
import Select from 'react-select';

import useInput from "../hooks/use-input";

const SensorForm = props => {
  const [selectedTags, setSelectedTags] = useState([]);

  const { 
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler : nameChangeHandler, 
    valueBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== "");

  const { 
    value: enteredLatitude, 
    isValid: enteredLatitudeIsValid,
    hasError: latitudeInputHasError, 
    hadFocus: latitudeHadFocus,
    valueChangeHandler: latitudeChangeHandler, 
    valueBlurHandler: latitudeBlurHandler,
    valueFocusHandler: latitudeFocusHandler,
  } = useInput(value => value.trim() !== "");

  const { 
    value: enteredLongitude, 
    isValid: enteredLongitudeIsValid,
    hasError: longitudeInputHasError, 
    hadFocus: longitudeHadFocus,
    valueChangeHandler : longitudeChangeHandler, 
    valueBlurHandler: longitudeBlurHandler,
    valueFocusHandler: longitudeFocusHandler
  } = useInput(value => value.trim() !== "");

  const tagsOptions = [];
  props.tags.forEach(tag => {
    tagsOptions.push({
      value: tag,
      label: tag
    });
  });

  const tagSelectionHandler = selection => {
    setSelectedTags(selection);
  };

  // Manage overall form validity
  let formIsValid = false;
  if (enteredLatitudeIsValid && enteredLongitudeIsValid) {
    if (props.isEditing || (!props.isEditing && enteredNameIsValid)) {
      formIsValid = true
    }
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    
    const sensorMetadata = {
      latitude: +enteredLatitude,
      longitude: +enteredLongitude,
    };

    if (props.isEditing) {
      sensorMetadata["id"] = props.sensor.id;
      props.editSensor(sensorMetadata);
    } else {
      sensorMetadata["id"] = `s${Math.floor(Math.random() * 100)}`;
      sensorMetadata["name"] = enteredName;
      sensorMetadata["tags"] = selectedTags.map(tag => tag.label);
      props.addSensor(sensorMetadata);
    }

    closePopupHandler();
  };

  const closePopupHandler = () => {
    props.closeForm();
  };

  const latitudeValue = props.isEditing && !latitudeHadFocus
    ? props.sensor.latitude
    : enteredLatitude || "";
  const longitudeValue = props.isEditing && !longitudeHadFocus
    ? props.sensor.longitude
    : enteredLongitude || "";

  return (
    <Fragment>
      <form onSubmit={formSubmissionHandler}>
        {props.isEditing && <h2>{props.sensor.name}</h2>}
        {!props.isEditing &&
          <div className="form-section">
            <label htmlFor="sensor-name">Name</label>
            <input 
              type="text"
              id="sensor-name"
              name="sensor-name"
              onChange={nameChangeHandler} 
              onBlur={nameBlurHandler}
              value={enteredName || ""}
            />
            {nameInputHasError &&
              <p className="error-text">Name must not be empty</p>
            }
          </div>
        }
        <div className="form-section">
          <label htmlFor="sensor-latitude">Latitude</label>
          <input 
            type="number"
            id="sensor-latitude"
            name="sensor-latitude"
            onChange={latitudeChangeHandler} 
            onFocus={latitudeFocusHandler}
            onBlur={latitudeBlurHandler}
            value={latitudeValue}
          />
          {latitudeInputHasError &&
            <p className="error-text">Latitude must not be empty</p>
          }
        </div>
        <div className="form-section">
          <label htmlFor="sensor-longitude">Longitude</label>
          <input 
            type="number"
            id="sensor-longitude"
            name="sensor-longitude"
            onChange={longitudeChangeHandler} 
            onFocus={longitudeFocusHandler}
            onBlur={longitudeBlurHandler}
            value={longitudeValue}
          />
          {longitudeInputHasError &&
            <p className="error-text">Longitude must not be empty</p>
          }
        </div>
        {!props.isEditing &&
          <div className="form-section">
            <label>Tags</label>
            <Select
              options={tagsOptions}
              isMulti
              isClearable
              onChange={tagSelectionHandler}
            />
          </div>
        }
        <div className="form-actions">
          <button
            type="submit"
            disabled={!formIsValid}
          >
            Submit
          </button>
          <button 
            className="btn-secondary"
            type="reset"
            onClick={closePopupHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default SensorForm;