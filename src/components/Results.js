import Card from "../UI/Card";
import Edit from "../assets/Edit";

const Results = props => {
  return (
    <div className="results">
      {props.isSearch
        ? <h2>Search Results</h2>
        : <h2>All Sensors</h2>
      }
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
            <button className="edit">
              <span className="button-icon">
                <Edit />
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