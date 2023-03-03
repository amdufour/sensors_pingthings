import { Fragment, useState, useEffect } from "react";

import Loader from "./Loader";
import Filters from "./Filters";
import Results from "./Results";

const Sensors = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [sensors, setSensors] = useState([]);
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

      setSensors(loadedSensors);
      setIsLoading(false);
      setAvailableTags(tags);
    };

    fetchSensors();
  }, []);

  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-12 col-md-4">
            <Filters 
              tags={availableTags}
            />
          </div>
          <div className="col-12 col-md-8">
            {isLoading && <Loader />}
            {!isLoading && <Results sensors={sensors} />}
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