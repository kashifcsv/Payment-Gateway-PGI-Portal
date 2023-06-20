import React from "react";
import "./postercomponent.css";
import Expand_left from "../../assets/Expand_left.png";
import poster from "../../assets/poster.png";

const Postercomponent = () => {
  const back = () => {
    window.history.back();
  };
  return (
    <>
      {/* <img onClick={back} className="pointer back" src={Expand_left} alt="image_not_found" /> */}

      <div className="myComponentContainer ">
        <img src={poster} alt="image_not_found" className="fold" />
        <div className="rectangle">
          <span className="text">Ad</span>
        </div>
        {/* Content inside the component */}
      </div>

      <br />
    </>
  );
};

export default Postercomponent;
