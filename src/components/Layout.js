import { Fragment } from "react";

import Sensors from "./Sensors";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <div className="container">
          <h1>Manage your Sensors</h1>
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