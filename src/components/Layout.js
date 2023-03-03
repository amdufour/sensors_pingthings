import { Fragment } from "react";

import Sensors from "./Sensors";

const Layout = props => {
  return (
    <Fragment>
      <header>
        <div className="container">
          <h1>Sensors</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <Sensors />
        </div>
      </main>
    </Fragment>
  );
};

export default Layout;