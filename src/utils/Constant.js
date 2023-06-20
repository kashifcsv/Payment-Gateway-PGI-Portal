const crypto = require("crypto");

function decryptData(text, crypto) {
  let key = "pplfe775xvye8j81elpo9b14d9c09098";
  let iv =
    "f" + "p" + "m" + "j" + "l" + "r" + "b" + "h" + "p" + "l" + "j" + "o" + "e" + "n" + "n" + "m";
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString());
}
const now = new Date();
const secondsSinceEpoch = Math.round(now.getTime());
const dateObj = new Date();
const currentDate =
  dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate();
const getAdTagUrlParams = function (url) {
  let params = url.split("?iu=/");
  params = params[1].split("&");
  params = params[0].split("/");
  return params[0] + "," + params[1];
};
function getDateDiff(time1, time2) {
  var str1 = time1.split("-");
  var str2 = time2.split("-");

  //                yyyy   , mm       , dd
  var t1 = new Date(str1[0], str1[1] - 1, str1[2]);
  var t2 = new Date(str2[0], str2[1] - 1, str2[2]);

  var diffMS = t2 - t1;
  // console.log(diffMS + ' ms');

  var diffS = diffMS / 1000;
  // console.log(diffS + ' ');

  var diffM = diffS / 60;
  // console.log(diffM + ' minutes');

  var diffH = diffM / 60;
  // console.log(diffH + ' hours');

  var diffD = diffH / 24;
  // console.log(diffD + ' days');
  // alert(Math.trunc(diffD/365));
  return Math.trunc(diffD / 365);
}
const setParamsUrl = function (param) {
  let params = param.replace(/ /g, "+");
  params = params.replace(/,/g, "%2C");
  params = params.replace(/(\r\n|\n|\r)/gm, "");
  // console.log("Params", params);
  return params;
};
const customAdTagUrl = function (adTagUrl, userProperties) {
  // console.log("User Properties", userProperties);
  // adUrl = setParamsUrl(userProperties.user_behavior.toString());
  let adUrl =
    adTagUrl +
    "&cust_params=placement_channel%3D" +
    setParamsUrl(userProperties.placement_channel) +
    "%26placement_program%3D" +
    setParamsUrl(userProperties.placement_program) +
    "%26placement_genre%3D" +
    setParamsUrl(userProperties.placement_genre) +
    "%26user_gender%3D" +
    setParamsUrl(userProperties.user_gender) +
    "%26user_age%3D" +
    setParamsUrl(userProperties.user_age.toString()) +
    "%26user_interest%3D" +
    setParamsUrl(userProperties.user_interest) +
    "%26user_type%3D" +
    setParamsUrl(userProperties.user_type) +
    "%26user_behavior%3D" +
    setParamsUrl(userProperties.user_behavior.toString());
  // console.log("AD URL", adUrl);
  return adUrl;
};

module.exports = {
  url: "https://sometv.com/alpha/api_gateway/",
  ucipUrl: "http://header.sometv.com/ucip/index.php/api/",
  streamIpUrl: "https://api.ipify.org?format=json",
  headerToken: "774a719yycaa6xc44bg12e5hf5buj69dmkcdt46dl",
  version: "beta",
  decryptData: (text) => decryptData(text, crypto),
  currentEpocTime: secondsSinceEpoch,
  currentDate: currentDate,
  getAdTagUrlParams: (url) => getAdTagUrlParams(url),
  getDateDiff: (date, currentDate) => getDateDiff(date, currentDate),
  customAdTagUrl: (url, userProperties) => customAdTagUrl(url, userProperties),
  authPassword: "hy9h3n()c6ypt@CIjt",
  radiantKey: "Kl8lNz1pPTBiPTR2KzJ5ZWk/cm9tNWRhc2lzMzBkYjBBJV8q",
};
