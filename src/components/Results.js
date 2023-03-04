import Card from "../UI/Card";
import EditIcon from "../assets/Edit-icon";
import AddSensor from "./Add-sensor";

const Results = props => {

  const clickEditHandler = sensor => {
    props.openFormToEdit(sensor);
  };

  const clickAddHandler = () => {
    props.openFormToAdd();
  };

  return (
    <div className="results">
      <div className="results-header">
        {props.isSearch
          ? <h2>Search Results</h2>
          : <h2>All Sensors</h2>
        }
        <AddSensor clickAddHandler={clickAddHandler} />
      </div>
      {props.sensors.map(sensor => (
        <Card key={sensor.id}>
          <h3>{sensor.name}</h3>
          <div className="card-section">
            <div className="card-section-title">Location</div>
            <div className="coordinates">
              <div className="coordinate coordinate-latitude">
                <span className="label">Latitude: </span>
                <span>{sensor.latitude}</span>
              </div>
              <div className="coordinate coordinate-longitude">
                <span className="label">Longitude: </span>
                <span>{sensor.longitude}</span>
              </div>
            </div>
          </div>
          <div className="card-section">
            <div className="card-section-title">Tags</div>
            <div className="tags">
              {sensor.tags.map(tag => (
                <div key={`${sensor.id}-${tag}`} className="tag">{tag}</div>
              ))}
            </div>
          </div>
          <div className="edit">
            <button 
              className="edit"
              onClick={() => clickEditHandler(sensor)}
            >
              <span className="button-icon">
                <EditIcon />
              </span>
              <span className="button-text">Edit</span>
            </button>
          </div>
        </Card>
      ))}
      {props.sensors.length === 0 &&
        <div className="no-result">Bummer! No results found.</div>
      }
    </div>
  );
};

export default Results;