import { Fragment, useState, useEffect } from "react";

import Loader from "./Loader";
import Filters from "./Filters";
import Results from "./Results";

const Sensors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allSensors, setAllSensors] = useState([]);
  const [sensorsToDisplay, setSensorsToDisplay] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchParameters, setSearchParameters] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    // Fetch the sensors data
    const sensorsURL = "https://sensors-pingthings-default-rtdb.europe-west1.firebasedatabase.app/sensors.json";

    const fetchSensors = async () => {
      const response = await fetch(sensorsURL);
      const responseData = await response.json();

      const loadedSensors = [];
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
      setAvailableTags(tags);
    };

    fetchSensors();
  }, []);

  const filterSensors = (type, id, action) => {
    console.log(type, id, action);

    // Update the current search parameters
    const params = JSON.parse(JSON.stringify(searchParameters));
    if (action === "add") {
      params.push({
        type: type,
        id: id
      });
    } else {
      const index = params.findIndex(param => param.id === id && param.type === type);
      params.splice(index, 1);
    }

    const searchStatus = searchParameters.length > 0 ? true : false;
    setIsSearch(searchStatus);
    setSearchParameters(params);
    console.log("searchParameters", searchParameters)


    // Update the list of sensors to display
    const filteredSensors = [];
    allSensors.forEach(sensor => {
      console.log("sensor", sensor)
      let sensorMatchFilters = true;

      params.forEach(param => {
        console.log("search param", param)
        if (sensorMatchFilters) {
          switch (param.type) {
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

  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-12 col-md-4">
            <Filters 
              tags={availableTags}
              filterSensors={filterSensors}
            />
          </div>
          <div className="col-12 col-md-8">
            {isLoading && <Loader />}
            {!isLoading && <Results sensors={sensorsToDisplay} isSearch={isSearch} />}
          </div>
        </div>
      </section>
      <section>
        <div>Add a sensor</div>
      </section>
    </Fragment>
  );
};

export default Sensors