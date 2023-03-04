import { Fragment, useEffect, useState } from "react";
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
    valueChangeHandler : latitudeChangeHandler, 
    valueBlurHandler: latitudeBlurHandler,
  } = useInput(value => value.trim() !== "");

  const { 
    value: enteredLongitude, 
    isValid: enteredLongitudeIsValid,
    hasError: longitudeInputHasError, 
    valueChangeHandler : longitudeChangeHandler, 
    valueBlurHandler: longitudeBlurHandler,
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

  useEffect(() => {
    
    // If is editing mode, set the fields value with the sensor metadata
    if (props.isEditing) {
      const latInput = document.getElementById("sensor-latitude");
      latInput.value = props.sensor.latitude;
      
      const latEvent = new Event("input", { bubbles: true });
      const latTracker = latInput._valueTracker;

      if (latTracker) {
        latTracker.setValue(props.sensor.latitude);
      }
      latInput.dispatchEvent(latEvent);

      const longInput = document.getElementById("sensor-longitude");
      longInput.value = props.sensor.longitude;
      
      const longEvent = new Event("input", { bubbles: true });
      const longTracker = longInput._valueTracker;

      if (longTracker) {
        longTracker.setValue(props.sensor.longitude);
      }
      longInput.dispatchEvent(longEvent);
    }

  }, []);

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

    closePopupHandler();
    
    const sensorMetadata = {
      id: `s${Math.floor(Math.random() * 100)}`,
      name: enteredName,
      latitude: +enteredLatitude,
      longitude: +enteredLongitude,
      tags: selectedTags.map(tag => tag.label)
    };
    props.addSensor(sensorMetadata);
  };

  const closePopupHandler = () => {
    props.closeForm();
  };

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
            type="text"
            id="sensor-latitude"
            name="sensor-latitude"
            onChange={latitudeChangeHandler} 
            onBlur={latitudeBlurHandler}
            value={enteredLatitude || ""}
          />
          {latitudeInputHasError &&
            <p className="error-text">Latitude must not be empty</p>
          }
        </div>
        <div className="form-section">
          <label htmlFor="sensor-longitude">Longitude</label>
          <input 
            type="text"
            id="sensor-longitude"
            name="sensor-longitude"
            onChange={longitudeChangeHandler} 
            onBlur={longitudeBlurHandler}
            value={enteredLongitude || ""}
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