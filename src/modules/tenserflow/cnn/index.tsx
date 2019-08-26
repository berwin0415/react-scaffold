import React, { useEffect, useState } from "react";
import { run } from "./utils";

export default () => {

  useEffect(() => {
    run();
  }, [1]);
  return <div id="container">cnn</div>;
};
