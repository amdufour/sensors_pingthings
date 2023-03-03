import { Fragment, useState, useEffect } from "react";

import Loader from "./Loader";
import Results from "./Results";

const Sensors = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const sensorsURL = "https://sensors-pingthings-default-rtdb.europe-west1.firebasedatabase.app/sensors.json";

    const fetchSensors = async () => {
      const response = await fetch(sensorsURL);
      const responseData = await response.json();

      const loadedSensors = [];
      for (const key in responseData) {
        loadedSensors.push({
          id: key,
          name: responseData[key].name,
          latitude: responseData[key].loc_lat,
          longitude: responseData[key].loc_long,
          tags: responseData[key].tags,
        });
      }

      setSensors(loadedSensors);
      setIsLoading(false)
      console.log("sensors", loadedSensors);
    };

    fetchSensors();
  }, []);

  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-12 col-md-4">Filters</div>
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