import React from "react";
import happy from "../../assets/happy.png";
import { useHistory, useLocation } from "react-router-dom";
import someLogo from "../../assets/somelogo.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect } from "react";

const Thanks = () => {
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
      <div className="happy flexCenter">
        <img src={happy} alt="image_not_found" />
      </div>
      <span className="happy flexCenter white f15">
        <p>+49{location?.state?.state?.phoneNumber}</p>
      </span>
      <div className="some">
        <img src={someLogo} alt="image_not_found" />
      </div>
      <div className="happy f15p flexCenter">
        {/* <span>You're already subscribed to the monthly package. Logging you in...</span> */}
        <span>Thanks For Choosing some Cash</span>
      </div>
      <div className="flexCenter mt-4">
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

export default Thanks;
