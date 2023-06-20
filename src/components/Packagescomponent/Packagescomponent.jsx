import React, { useEffect } from "react";
import "./Packagescomponent.css";
import { packageScreen } from "../../api/services";
import { decryptData } from "../../utils/Constant";
import Footer from "../layout/Footer";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Packagescomponent = () => {
  const history = useHistory();

  let search = window.location.search;
  let params = new URLSearchParams(search);
  const [mobileInfo, setMobileInfo] = useState({});
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    connectionType();
    getAllPackages();
  }, []);

  const connectionType = () => {
    if (navigator.connection) {
      var connectionType = navigator.connection.type;
      if (connectionType === "wifi") {
        console.log("Connected to WiFi");
      } else if (connectionType === "cellular") {
        console.log("Connected to mobile network");
      } else {
        console.log("Unknown connection type");
      }
    } else {
      console.log("The navigator.connection API is not supported in this browser.");
    }
  };

  const getAllPackages = async () => {
    // console.log("abcd: ", searchParams.get("telco"));
    const payLoad = {
      telco: params.get("telco") || "some",
      type: params.get("type") || "prepaid",
      phone_details: params.get("phone_details") || "iPhone X (16.3.1)",
      is_some_user: params.get("is_some_user") || "true",
      other_telco: params.get("other_telco") || "some",
      mobile: params.get("mobile") || "923000503314",
      user_id: params.get("user_id") || "18003357",
      isAlreadySubscriber: params.get("isAlreadySubscriber") || true,
      device_id: params.get("device_id") || "E5D0CB4A-8612-42E4-BEF2-F910786242B5",
    };
    console.warn("payload", payLoad);
    if (
      !payLoad?.is_some_user ||
      !payLoad?.telco ||
      !payLoad?.type ||
      !payLoad?.phone_details ||
      !payLoad?.is_some_user ||
      !payLoad?.other_telco ||
      !payLoad?.mobile ||
      !payLoad?.user_id ||
      !payLoad?.isAlreadySubscriber ||
      !payLoad?.device_id
    ) {
      // return alert("Please enter url with valid parameters");
    }
    setMobileInfo(payLoad);
    const getPackages = {};
    // const getPackages = await packageScreen(payLoad);
    // getPackages["data"] = decryptData(getPackages?.eData);
    // console.log("getPackages: ", getPackages?.data);
    // setSelectedPackage(getPackages?.data);
  };

  const handleSubscribe = (param, price) => {
    // if (mobileInfo.type === "postpaid") {
    // if (price > selectedPackage.data[0].price) {
    if (true) {
      if (true) {
        history.push({
          pathname: "/Payment-Method",
          search: `?package=${param}`, // query string
          state: {
            package: param,
            mobileInfo: mobileInfo,
          },
        });
      } else {
        alert(`You can only subscibe packages greater than ${selectedPackage.data[0].price} price`);
      }
    } else if (param === "monthly") {
      history.push({
        pathname: "/Payment-Method",
        search: `?package=${param}`, // query string
        state: {
          package: param,
          mobileInfo: mobileInfo,
        },
      });
    } else {
      alert(`prepaid users are only allowed to subscribe monthly package`);
    }
  };

  return (
    <>
      <div className="title">Select Package</div>
      <div className="cardContainer">
        <div className="cardTitle">Daily</div>
        <div className="cardPrice">USD. 10</div>
        <div className="cardContent">
          <p>Daily Package</p>
        </div>
        <button
          className="cardButton pointer cardButton280"
          onClick={() => handleSubscribe("daily", 10)}
        >
          Subscribe
        </button>
      </div>
      <div className="cardContainer mt-4">
        <div className="cardTitle">3-Day</div>
        <div className="cardPrice">USD. 25</div>
        <div className="cardContent">
          <p>3-Days Package</p>
        </div>
        <button
          className="cardButton pointer cardButton280"
          onClick={() => handleSubscribe("3day", 25)}
        >
          Subscribe
        </button>
      </div>
      <div className="cardContainer1">
        <div className="cardTitle1">Weekly</div>
        <div className="cardPrice1">USD. 50</div>
        <div className="cardContent1">
          <p>Weekly Package</p>
        </div>

        <button
          className="cardButton1 pointer cardButton280"
          onClick={() => handleSubscribe("weekly", 50)}
        >
          Subscribe
        </button>
      </div>
      <div className="cardContainer2">
        <div className="cardTitle2">Monthly</div>
        <div className="cardPrice2">USD. 120</div>
        <div className="cardContent2">
          <p>Monthly Package</p>
        </div>
        <button
          className="cardButton2 pointer cardButton280"
          onClick={() => handleSubscribe("monthly", 120)}
        >
          Subscribe
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Packagescomponent;
