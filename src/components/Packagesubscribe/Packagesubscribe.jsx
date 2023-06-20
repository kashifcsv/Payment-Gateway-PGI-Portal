import React, { useEffect } from "react";
import "./Packagesubscribe.css";
import Footer from "../layout/Footer";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useHistory, useLocation } from "react-router-dom";
import someLogo from "../../assets/somelogo.png";
import tick from "../../assets/Check_ring.png";

const Packagesubscribe = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location?.state) {
      history.push("/");
    }
  }, []);

  const animationCompleted = () => {
    history.push("/");
  };
  return (
    <>
      <div className="some">
        <img src={someLogo} alt="image_not_found" />
      </div>
      <div className="some">
        <img src={tick} alt="image_not_found" />
      </div>
      <div className="titlePackageSubscribe mt-4">
        <span className="headingsucces">Successfully Subscribed</span>
      </div>
      <div className="titlePackageSubscribe mt-4 mb-4">
        <span className="">To the {location.state.state.package} package. Logging you in...</span>
      </div>

      <div className="titlePackageSubscribe mt-4 mb-4">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={["#FFFFFF"]}
          size={90}
          onComplete={animationCompleted}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </>
  );
};

export default Packagesubscribe;
