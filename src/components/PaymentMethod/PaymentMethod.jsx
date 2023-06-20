import React, { useEffect } from "react";
import phone from "../../assets/phone.png";
import creditCard from "../../assets/Credit card.png";
import wallet from "../../assets/Wallet.png";
import rightArrow from "../../assets/Expand_right.png";
import "./PaymentMethod.css";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "../layout/Footer";

const PaymentMethod = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location?.state) {
      history.push("/");
    }
  }, []);

  const routeToEWallet = () => {
    history.push({
      pathname: "/e-wallet",
      state: {
        selectedPackage: location.state,
      },
    });
  };
  const routeToDebitCredit = () => {
    history.push({
      pathname: "/",
      state: {
        selectedPackage: location.state,
      },
    });
  };
  const routeToMobileCredit = () => {
    history.push({
      pathname: "/Mobile-Credit",
      state: {
        selectedPackage: location.state,
      },
    });
  };

  return (
    <div>
      <div className="container paymentMethodCardsAlign">
        <div className="mt30"></div>

        <span
          onClick={routeToMobileCredit}
          className="input-box mt-4 pointer bgWhite mobileCredit width25"
        >
          <img className="ml-2" src={phone} alt="image_not_found" />
          <span className="cBlack fs95 fs77 ml-3">Mobile Credit</span>
          <img className="ml39" src={rightArrow} alt="image_not_found" />
        </span>
        <span
          onClick={routeToDebitCredit}
          className="input-box mt-4 pointer bgWhite mobileCredit width25"
        >
          <img className="ml-1" src={creditCard} alt="image_not_found" />
          <span className="cBlack fs95 fs77 ml-2">Debit/Credit card</span>
          <img className="ml30" src={rightArrow} alt="image_not_found" />
        </span>
        <span
          onClick={routeToEWallet}
          className="input-box mt-4 pointer bgWhite mobileCredit width25 "
        >
          <img className="ml-2" src={wallet} alt="image_not_found" />
          <span className="cBlack fs77 ml-3">E-wallet</span>
          <img className="ml52" src={rightArrow} alt="image_not_found" />
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentMethod;
