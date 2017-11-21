import React from "react";
import loader from "./Loader.gif";
// import "./Loading.css";

const Loader = () => {
  return (
    <div className="loading">
      <img className="loading-img" src={loader} />
    </div>
  );
};

export default Loader;
