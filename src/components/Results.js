import Card from "../UI/Card";

const Results = props => {
  return (
    <div className="results">
      <h2>Sensors</h2>
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
            <button>Edit</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Results;