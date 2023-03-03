import { Fragment } from "react";

const Sensors = props => {
  return (
    <Fragment>
      <section>
        <div className="row">
          <div className="col-12 col-md-4">Filters</div>
          <div className="col-12 col-md-8">Results</div>
        </div>
      </section>
      <section>
        <div>Add a sensor</div>
      </section>
    </Fragment>
  );
};

export default Sensors