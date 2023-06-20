import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { easymoneyFirst, easymoneySecond } from "../../api/services";
import OTPInput from "otp-input-react";
import infoLight from "../../assets/info_light1.png";

const Verificationeasymoney = () => {
  const location = useLocation();
  const history = useHistory();

  const [OTP, setOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60);
  const [dynamicColorForOTP, setDynamicColorForOTP] = useState("disabled");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!location?.state) {
      history.push("/");
    }

    setTimeout(() => {
      if (timer >= 1) {
        setTimer(timer - 1);
      } else {
        setTimer(0);
      }
    }, 1000);
  }, [timer]);

  useEffect(() => {
    setDynamicColorForOTP(OTP.length !== 4 ? "disabled" : "enable");
  }, [OTP]);

  const resendCode = async (e) => {
    e.preventDefault();
    let reseasymoney = await easymoneyFirst(location.state.state.data);
    setTimer(60);
    console.log("reseasymoney: ", reseasymoney);
  };

  const submit = async () => {
    if (!email) {
      return alert("Please enter Your email");
    } else {
      const easymoneySecondPayLoad = {
        mobile: location.state.state.data.mobile,
        easypay_mobile: location.state.state.data.easypay_mobile,
        user_id: location.state.state.data.user_id,
        package_id: location.state.state.data.package_id,
        email: email,
        telco: location.state.state.data.telco,
        is_some_user: location.state.state.data.is_some_user,
        otp: OTP,
      };
      let reseasymoneySecond = await easymoneySecond(easymoneySecondPayLoad);

      console.log("reseasymoneySecond: ", reseasymoneySecond);
      if (reseasymoneySecond.status === "SUCCESS") {
        history.push("/package-Subscribe", {
          state: {
            phoneNumber: location.state.state.data.mobile,
            package: location.state.state.package,
          },
        });
      } else {
        history.push("/Already-Subscribe", {
          state: {
            phoneNumber: location.state.state.data.mobile,
            package: location.state.state.package,
            message: reseasymoneySecond.message,
          },
        });
      }
    }
  };

  return (
    <>
      <p className="textColorEnter mt-4 only768">Please enter your email</p>
      <div className="d-flex justify-content-center">
        <input
          className="btnWidth br5 textColorEnter  only768 inputField"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>
      <p className="textColorEnter mt-4 only768">Enter the code sent to your mobile number</p>
      <div className="container only768">
        <div className="row only768Block">
          <div className="col-12">
            <OTPInput
              required
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              secure={false}
              style={{ display: "flex", justifyContent: "center" }}
              inputStyles={{
                border: OTP.length !== 4 ? "1px solid #427fb9" : "3px solid #427fb9",
                borderRadius: "7px",
                height: "50px",
                width: "50px",
                marginRight: "15px",
                backgroundColor: "#171d2a",
                color: "white",
              }}
            />
          </div>
          <div className="col-12">
            {otpError && (
              <span className="mt-4 mb-2 wrongOtp only768">
                <img className="imageInfo" src={infoLight} alt="img_not_found" /> &nbsp;{otpError}
              </span>
            )}
          </div>
          <div className="col-12">
            {timer ? (
              <p className="mt-2 textColorEnter only768">Resend code in 00: {timer}</p>
            ) : (
              <p
                onClick={(e) => resendCode(e)}
                className="mt-2 resendCode pointer d-flex justify-content-center"
              >
                Resend code
              </p>
            )}
          </div>
          <div className="col-12">
            <button
              disabled={OTP.length !== 4}
              className={"mt-2 btnColor pointer btnWidth " + dynamicColorForOTP}
              onClick={(e) => {
                submit(e);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verificationeasymoney;
