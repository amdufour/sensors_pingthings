import { Fragment, useState, useEffect } from "react";

import Loader from "./Loader";
import Filters from "./Filters";
import Results from "./Results";
import PopUp from "../UI/PopUp";
import SensorForm from "./Sensor-form";

const Sensors = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allSensors, setAllSensors] = useState([]);
  const [sensorsToDisplay, setSensorsToDisplay] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParameters, setSearchParameters] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableNames, setAvailableNames] = useState([]);
  const [availableLatitudes, setAvailableLatitudes] = useState([]);
  const [availableLongitudes, setAvailableLongitudes] = useState([]);
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sensorToEdit, setSensorToEdit] = useState({});

  useEffect(() => {
    // Fetch the sensors data
    const sensorsURL = "https://sensors-pingthings-default-rtdb.europe-west1.firebasedatabase.app/sensors.json";

    const fetchSensors = async () => {
      try {
        const response = await fetch(sensorsURL);
        const responseData = await response.json();
  
        const loadedSensors = [];
        const names = [];
        const latitudes = [];
        const longitudes = [];
        const tags = [];
  
        // Extract sensors metadata
        for (const key in responseData) {
          loadedSensors.push({
            id: key,
            name: responseData[key].name,
            latitude: responseData[key].loc_lat,
            longitude: responseData[key].loc_long,
            tags: responseData[key].tags,
          });
  
          // Extract available names
          // We consider that names are unique for simplicity
          names.push({
            value: responseData[key].name.toLowerCase(),
            label: responseData[key].name
          });
  
          // Extract available locations
          let latitudeCounter = 0;
          let longitudeCounter = 0;
          if (!latitudes.find(lat => lat.label === responseData[key].loc_lat)) {
            latitudes.push({
              value: `latitude_${latitudeCounter}`,
              label: responseData[key].loc_lat
            });
          }
          if (!longitudes.find(long => long.label === responseData[key].loc_long)) {
            longitudes.push({
              value: `latitude_${longitudeCounter}`,
              label: responseData[key].loc_long
            });
          }
  
          // Extract available tags
          responseData[key].tags.forEach(tag => {
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
          });
        }
  
        setAllSensors(loadedSensors);
        setSensorsToDisplay(loadedSensors);
        setIsLoading(false);
        setAvailableNames(names);
        setAvailableLatitudes(latitudes);
        setAvailableLongitudes(longitudes);
        setAvailableTags(tags);

      } catch (error) {
        console.log("error")
        setIsError(true);
      }
    };

    fetchSensors();
  }, []);

  const filterSensors = (type, id, action) => {

    // Update the current search parameters
    let params = JSON.parse(JSON.stringify(searchParameters));
    switch (type) {
      case "name":
        params = params.filter(param => param.type !== type);
        if (id.length > 0) {
          params.push({
            type: type,
            id: id
          });
        }
        break;
      case "latitude":
      case "longitude":
        params = params.filter(param => param.type !== type);
        if (id) {
          params.push({
            type: type,
            id: id
          });
        }
        break;
      case "tag":
        if (action === "add") {
          params.push({
            type: type,
            id: id
          });
        } else {
          const index = params.findIndex(param => param.id === id && param.type === type);
          params.splice(index, 1);
        }
        break;
    };

    const searchStatus = searchParameters.length > 0 ? true : false;
    setIsSearch(searchStatus);
    setSearchParameters(params);


    // Update the list of sensors to display
    const filteredSensors = [];
    allSensors.forEach(sensor => {
      let sensorMatchFilters = true;

      params.forEach(param => {
        if (sensorMatchFilters) {
          switch (param.type) {
            case "name":
            case "latitude":
            case "longitude":
              sensorMatchFilters = sensor[param.type] === param.id ? true : false;
              break;
            case "tag":
              sensorMatchFilters = sensor.tags.includes(param.id) ? true : false;
              break;
          };
        }

      });
      
      if (sensorMatchFilters) {
        filteredSensors.push(sensor);
      }

    });

    setSensorsToDisplay(filteredSensors);
    
  };

  const openFormToAdd = () => {
    setPopupIsVisible(true);
    setIsEditing(false);
  };

  const openFormToEdit = sensor => {
    setPopupIsVisible(true);
    setIsEditing(true);
    setSensorToEdit(sensor);
  };

  const closeForm = () => {
    setPopupIsVisible(false);
    setIsEditing(false);
  }

  const addSensor = sensor => {
    const sensors = JSON.parse(JSON.stringify(sensorsToDisplay));
    sensors.unshift(sensor);
    setSensorsToDisplay(sensors);
  };

  const editSensor = sensor => {
    const sensors = JSON.parse(JSON.stringify(sensorsToDisplay));
    const editedSensor = sensors.find(s => s.id === sensor.id);
    editedSensor.latitude = sensor.latitude;
    editedSensor.longitude = sensor.longitude;
    setSensorsToDisplay(sensors);
  };

  useEffect(() => {
    document.body.style.overflow = popupIsVisible ? "hidden" : "unset";
    document.body.style.height = popupIsVisible ? "100vh" : "auto";
  }, [popupIsVisible]);

  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-12 col-md-4">
            <Filters 
              names={availableNames}
              latitudes={availableLatitudes}
              longitudes={availableLongitudes}
              tags={availableTags}
              filterSensors={filterSensors}
            />
          </div>
          <div className="col-12 col-md-8">
            {isLoading && <Loader />}
            {!isLoading && !isError && 
              <Results 
                sensors={sensorsToDisplay} 
                isSearch={isSearch} 
                openFormToAdd={openFormToAdd}
                openFormToEdit={openFormToEdit}
              />}
            {!isLoading && isError &&  <div className="no-result">Oops! Something went wrong. Please try again later.</div>}
          </div>
        </div>
      </section>
      {popupIsVisible &&
        <PopUp>
          <SensorForm
            tags={availableTags}
            isEditing={isEditing}
            sensor={sensorToEdit}
            closeForm={closeForm}
            addSensor={addSensor}
            editSensor={editSensor}
          />
        </PopUp>
      }
    </Fragment>
  );
};

export default Sensors