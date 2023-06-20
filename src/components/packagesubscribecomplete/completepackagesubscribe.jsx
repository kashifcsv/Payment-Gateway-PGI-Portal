import React, { useEffect } from "react";
import "./completepackagesubscribe.css";
import sad from "../../assets/sad.png";
import someLogo from "../../assets/somelogo.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useLocation, useHistory } from "react-router";

const Completepackagesubscribe = () => {
  const location = useLocation();
  const history = useHistory();

  const animationCompleted = () => {
    history.push("/");
  };

  useEffect(() => {
    if (!location?.state) {
      history.push("/");
    }
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <>
      <div className="happy flexCenter">
        <img className="sad" src={sad} alt="image_not_found" />
      </div>
      <span className="happy flexCenter white f15">
        <p>+49{location.state.state.phoneNumber}</p>
      </span>
      <div className="some">
        <img src={someLogo} alt="image_not_found" />
      </div>
      <div className="happy f15p flexCenter">
        {/* <span>You're already subscribed to the monthly package. Logging you in...</span> */}
        <span>
          {location.state.state?.message
            ? location.state.state.message
            : `You have been subscribed. Please enjoy your ${location.state.state.package} free trial`}
        </span>
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

export default Completepackagesubscribe;
