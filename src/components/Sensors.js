import { Fragment, useState, useEffect } from "react";

import Loader from "./Loader";
import Filters from "./Filters";
import Results from "./Results";
import PopUp from "../UI/PopUp";
import SensorForm from "./Sensor-form";

const Sensors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allSensors, setAllSensors] = useState([]);
  const [sensorsToDisplay, setSensorsToDisplay] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParameters, setSearchParameters] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [availableNames, setAvailableNames] = useState([]);
  const [availableLatitudes, setAvailableLatitudes] = useState([]);
  const [availableLongitudes, setAvailableLongitudes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch the sensors data
    const sensorsURL = "https://sensors-pingthings-default-rtdb.europe-west1.firebasedatabase.app/sensors.json";

    const fetchSensors = async () => {
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

  const editSensor = sensor => {
    console.log(sensor)
    setIsEditing(true);
  };

  useEffect(() => {
    document.body.style.overflow = isEditing ? "hidden" : "unset";
    document.body.style.height = isEditing ? "100vh" : "auto";
  }, [isEditing]);

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
            {!isLoading && 
              <Results 
                sensors={sensorsToDisplay} 
                isSearch={isSearch} 
                editSensor={editSensor}
              />}
          </div>
        </div>
      </section>
      <section>
        <div>Add a sensor</div>
      </section>
      {isEditing &&
        <PopUp>
          <SensorForm

          />
        </PopUp>
      }
    </Fragment>
  );
};

export default Sensors