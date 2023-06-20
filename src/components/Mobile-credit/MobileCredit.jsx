import React, { useState } from "react";
import Footer from "../layout/Footer";
import some from "../../assets/some.png";
import tel from "../../assets/tel.png";
import z from "../../assets/z.png";
import uf from "../../assets/uf.png";
import infoLight from "../../assets/info_light1.png";
import { useEffect } from "react";
import "../E-wallet/Ewallet.css";
import OTPInput from "otp-input-react";
import { useHistory, useLocation } from "react-router-dom";
import { isAndroid, isIOS } from "react-device-detect";
import Constant from "../../utils/Constant";

import {
  resendOtp,
  sendOTPApi,
  subScribeDbssAPI,
  subScribeDbsszAPI,
  verifyOtp,
} from "../../api/services";
import { checkSubscribeDbssAPI } from "../../api/services";
import "./MobileCredit.css";
const MobileCredit = () => {
  const location = useLocation();
  const history = useHistory();

  const [issomeNetwork, setIssomeNetwork] = useState(true);
  const [issomeNetworkClass, setIssomeNetworkClass] = useState("enabledNetwork");
  const [istelNetwork, setIstelNetwork] = useState(false);
  const [istelNetworkClass, setIstelNetworkClass] = useState("disabledNetwork");
  const [iszNetwork, setIszNetwork] = useState(false);
  const [iszNetworkClass, setIszNetworkClass] = useState("disabledNetwork");
  const [isufNetwork, setIsufNetwork] = useState(false);
  const [isufNetworkClass, setIsufNetworkClass] = useState("disabledNetwork");
  const [timer, setTimer] = useState(0);
  const [OTP, setOTP] = useState("");
  const [otpError, setOtpError] = useState("");

  const [isOTPDisabled, setIsOTPDisabled] = useState(true);
  const [dynamicColorForOTP, setDynamicColorForOTP] = useState("disabled");

  const [isMobileNumber, setIsMobileNumber] = useState(true);
  const [pNumber, setPnumber] = useState("");
  const [pNumberError, setPnumberError] = useState("");
  const [dynamicColorForBtn, setDynamicColorForBtn] = useState("disabled");

  const [device, setDevice] = useState(false);
  const [signUpApi, setSignUpApi] = useState({});

  useEffect(() => {
    if (!location?.state) {
      history.push("/");
    }
    if (isAndroid) {
      setDevice("andriod");
    }
    if (isIOS) {
      setDevice("ios");
    }
  }, []);

  useEffect(() => {
    setDynamicColorForOTP(OTP.length !== 4 ? "disabled" : "enable");
  }, [OTP]);

  useEffect(() => {
    setTimeout(() => {
      if (timer >= 1) {
        setTimer(timer - 1);
      } else {
        setTimer(0);
      }
    }, 1000);
  }, [timer]);

  useEffect(() => {
    setDynamicColorForBtn(isMobileNumber ? "disabled" : "enable");
  }, [isMobileNumber]);

  const someClick = () => {
    setIssomeNetwork(true);
    setIstelNetwork(false);
    setIszNetwork(false);
    setIsufNetwork(false);
    setIssomeNetworkClass("enabledNetwork");
    setIstelNetworkClass("disabledNetwork");
    setIszNetworkClass("disabledNetwork");
    setIsufNetworkClass("disabledNetwork");
  };

  const telClick = () => {
    setIssomeNetwork(false);
    setIstelNetwork(true);
    setIszNetwork(false);
    setIsufNetwork(false);
    setIssomeNetworkClass("disabledNetwork");
    setIstelNetworkClass("enabledNetwork");
    setIszNetworkClass("disabledNetwork");
    setIsufNetworkClass("disabledNetwork");
  };

  const zClick = () => {
    setIssomeNetwork(false);
    setIstelNetwork(false);
    setIszNetwork(true);
    setIsufNetwork(false);
    setIssomeNetworkClass("disabledNetwork");
    setIstelNetworkClass("disabledNetwork");
    setIszNetworkClass("enabledNetwork");
    setIsufNetworkClass("disabledNetwork");
  };

  const ufClick = () => {
    setIssomeNetwork(false);
    setIstelNetwork(false);
    setIszNetwork(false);
    setIsufNetwork(true);
    setIssomeNetworkClass("disabledNetwork");
    setIstelNetworkClass("disabledNetwork");
    setIszNetworkClass("disabledNetwork");
    setIsufNetworkClass("enabledNetwork");
  };

  const settingMobileNumber = (e) => {
    if (e.target.value[0] == 0) {
      setIsMobileNumber(true);
      setPnumberError("Your phone number must start with number 3");
    } else if (e.target.value.length < 11) {
      setPnumberError("");
      setPnumber(e.target.value);
      setIsMobileNumber(e.target.value.length === 10 ? false : true);
    }
  };

  const submitMobileNumber = async () => {
    setIsMobileNumber(true);

    try {
      let tele = "";
      if (issomeNetwork) {
        tele = "some";
      } else if (istelNetwork) {
        tele = "tel";
      } else if (iszNetwork) {
        tele = "z";
      } else if (isufNetwork) {
        tele = "uf";
      }

      const payLoad = {
        from_screen: "signUp",
        device: device,
        telco: tele,
        device_id: location.state.selectedPackage.mobileInfo.device_id,
        is_header_enrichment: "no",
        other_telco: tele,
        mobile: `92${pNumber}`,
        phone_details: location.state.selectedPackage.mobileInfo.phone_details,
      };

      let result = await sendOTPApi(payLoad);
      result["data"] = Constant.decryptData(result.eData);
      console.log("result: ", result);
      setSignUpApi(result.data);
      if (result.data.status === "SUCCESS") {
        setIsOTPDisabled(false);
        setTimer(60);
      } else {
        setOtpError(result?.data?.error_message);
      }
    } catch (error) {
      console.warn("error: ", error);
      alert(error);
    }
  };

  const sendOtp = async () => {
    setOtpError("");
    try {
      const payLoad2 = {
        type: signUpApi.type,
        otpId: "",
        phone_details: signUpApi.phone_details,
        code: OTP,
        telco: signUpApi.telco,
        service_class: signUpApi.service_class,
        other_telco: signUpApi.other_telco,
        mobile: `92${pNumber}`,
        user_id: signUpApi.uid,
        device_id: signUpApi.device_id,
        is_some_user: signUpApi.is_some_user,
        opId: 0,
      };
      let res = await verifyOtp(payLoad2);
      res["data"] = Constant.decryptData(res.eData);
      console.log("OTP: ", res);

      if (res.data.status === "SUCCESS") {
        // check-subscribe-dbss
        let package_id;
        switch (location.state.selectedPackage.package) {
          case "daily":
            package_id = 1;
            break;
          case "3day":
            package_id = 5;
            break;
          case "weekly":
            package_id = 2;
            break;
          case "monthly":
            package_id = 4;
            break;

          default:
            package_id = 1;
            break;
        }

        if (payLoad2.telco === "some") {
          let checSubscribeDbssPayLoad = {
            user_id: signUpApi.uid,
            mobile: `92${pNumber}`,
            package_id: package_id,
            user_agent:
              "Mozilla/5.0(iPhone;CPUiPhoneOS16_3_1likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/15E148",
          };
          const checkSub = await checkSubscribeDbssAPI(checSubscribeDbssPayLoad);
          checkSub["data"] = Constant.decryptData(checkSub.eData);
          console.log("check-subscribe-dbss: ", checkSub);
          if (checkSub?.data?.status == "SUCCESS") {
            // subscribe-dbss
            let subscribeDBssPayLoad = {
              type: checkSub?.data?.type,
              user_id: signUpApi.uid,
              mobile: `92${pNumber}`,
              package_id: package_id,
              user_agent:
                "Mozilla/5.0(iPhone;CPUiPhoneOS16_3_1likeMacOSX)AppleWebKit/605.1.15(KHTML,likeGecko)Mobile/15E148",
              dbss_sub_id: checkSub?.data?.dbss_sub_id,
            };
            let sub = await subScribeDbssAPI(subscribeDBssPayLoad);
            sub["data"] = Constant.decryptData(sub.eData);
            console.log("subscribe-dbss: ", sub);
            if (sub.data.status === "SUCCESS") {
              history.push("/package-Subscribe", {
                state: {
                  phoneNumber: pNumber,
                  package: location.state.selectedPackage.package,
                },
              });
            } else {
              history.push("/Already-Subscribe", {
                state: {
                  phoneNumber: pNumber,
                  package: location.state.selectedPackage.package,
                  message: sub?.data?.message || sub?.data?.error_message,
                },
              });
            }
          } else {
            history.push("/Already-Subscribe", {
              state: {
                phoneNumber: pNumber,
                package: location.state.selectedPackage.package,
                message: checkSub?.data?.message,
              },
            });
          }
        } else {
          let subscribeDBsszPayLoad = {
            type: "prepaid",
            user_id: signUpApi.uid,
            mobile: `92${pNumber}`,
            package_id: package_id,
            telco: signUpApi.telco,
            other_telco: signUpApi.telco,
          };
          let sub = await subScribeDbsszAPI(subscribeDBsszPayLoad);
          sub["data"] = Constant.decryptData(sub.eData);
          console.log("subscribe-dbss-z: ", sub);
          if (sub.data.status === "SUCCESS") {
            history.push("/package-Subscribe", {
              state: {
                phoneNumber: pNumber,
                package: location.state.selectedPackage.package,
              },
            });
          } else {
            history.push("/Already-Subscribe", {
              state: {
                phoneNumber: pNumber,
                package: location.state.selectedPackage.package,
                message: sub?.data?.message || sub?.data?.error_message,
              },
            });
          }
        }
      } else {
        setOtpError("Incorrect PIN. Please try again");
        setOTP("");
      }
    } catch (error) {
      console.log("error", error);
      alert("error", error);
    }
  };

  const resendOTP = async () => {
    setOTP("");
    setOtpError("");
    const payLoad = {
      user_id: signUpApi.uid,
      mobile: `0${pNumber}`,
      telco: signUpApi.telco,
      type: signUpApi.type,
      other_telco: signUpApi.telco,
      is_some_user: signUpApi.is_some_user,
    };
    const resendOtpRes = await resendOtp(payLoad);
    resendOtpRes["data"] = Constant.decryptData(resendOtpRes.eData);
    setTimer(60);
    console.log("resendOtpRes: ", resendOtpRes);
  };

  return (
    <>
      <div className="container ">
        <p className="textColor mt-4 only768">Select Network</p>
        <div className="mt-2 d-flex justify-content-center align-items-center">
          {/* but */}
          <img
            className={"pointer some " + issomeNetworkClass}
            onClick={someClick}
            src={some}
            alt="image_not_found"
          />
          <img
            className={"pointer tel " + istelNetworkClass}
            onClick={telClick}
            src={tel}
            alt="image_not_found"
          />
          <img
            className={"pointer z ml-4 " + iszNetworkClass}
            onClick={zClick}
            src={z}
            alt="image_not_found"
          />
          <img
            className={"pointer uf ml-4 " + isufNetworkClass}
            onClick={ufClick}
            src={uf}
            alt="image_not_found"
          />
        </div>
        <p className="textColor mt-4 only768">Enter mobile number</p>
        <div className="container only768">
          <div className="row only768Block">
            <div className="col-12">
              <div className="input-box mt-4">
                <span className="prefix">&nbsp;&nbsp;+49&nbsp;&nbsp; | </span>
                <input
                  readOnly={
                    (issomeNetwork || istelNetwork || iszNetwork || isufNetwork) &&
                    isOTPDisabled
                      ? false
                      : true
                  }
                  value={pNumber}
                  onChange={settingMobileNumber}
                  type="tel"
                  placeholder="300 0000 000"
                />
              </div>
            </div>
            <div className="col-12">
              <p className="red"> {pNumberError} </p>
            </div>
            <div className="col-12">
              <button
                disabled={isMobileNumber}
                className={"mt2 btnColor btnWidth pointer " + dynamicColorForBtn}
                onClick={(e) => {
                  submitMobileNumber(e);
                }}
              >
                Continue
              </button>
            </div>
          </div>
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
                disabled={isOTPDisabled}
                secure={false}
                style={{ display: "flex", justifyContent: "center" }}
                inputStyles={{
                  border: isOTPDisabled ? "1px solid #427fb9" : "3px solid #427fb9",
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
              {!isOTPDisabled ? (
                timer ? (
                  <p className="mt-2 textColorEnter  only768">Resend code in 00: {timer}</p>
                ) : (
                  <p onClick={(e) => resendOTP(e)} className="mt-2 resendCode pointer only768">
                    Resend code
                  </p>
                )
              ) : null}
            </div>
            <div className="col-12">
              <button
                disabled={OTP.length !== 4}
                className={"mt-2 btnColor pointer btnWidth " + dynamicColorForOTP}
                onClick={(e) => {
                  sendOtp(e);
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        <div className="mb-2"></div>
        <br />
      </div>
      <Footer />
    </>
  );
};

export default MobileCredit;
