import React from "react";
import "./Footer.css";
const Footer = () => {
  const footerClciked = () => {
    window.open("https://google.com");
  };
  return (
    <div onClick={footerClciked} className="footerCss pointer">
      <br />
      Terms of Use
    </div>
  );
};

export default Footer;
