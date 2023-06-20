import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod";
import Postercomponent from "./components/poster/postercomponent";

import Packagesubscribe from "./components/Packagesubscribe/Packagesubscribe";
import Ewallet from "./components/E-wallet/Ewallet";
import Packagescomponent from "./components/Packagescomponent/Packagescomponent";
import Completepackagesubscribe from "./components/packagesubscribecomplete/completepackagesubscribe";
import MobileCredit from "./components/Mobile-credit/MobileCredit";
import Verificationeasymoney from "./components/Verification-easymoney/Verificationeasymoney";
import Thanks from "./components/Thanks/Thanks";

function App() {
  return (
    <Switch>
      <div id="routeContainer" className="container">
        <Postercomponent />
        <Route exact path="/" component={Packagescomponent} />
        <Route path="/Payment-Method" component={PaymentMethod} />{" "}
        <Route path="/Mobile-credit" component={MobileCredit} />
        <Route path="/e-wallet" component={Ewallet} />
        <Route path="/package-Subscribe" component={Packagesubscribe} />
        <Route path="/Already-Subscribe" component={Completepackagesubscribe} />
        <Route path="/easymoney-Verification" component={Verificationeasymoney} />
        <Route path="/Thanks" component={Thanks} />
      </div>
    </Switch>
  );
}

export default App;
