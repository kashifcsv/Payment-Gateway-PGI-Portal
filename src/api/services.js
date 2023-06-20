import { postApiData, getApiData } from "./axiosService";

export const packageScreen = async (data) => {
  // let response = postApiData(
  //   `/package-screen-wc?telco=${data.telco}&type=${data.type}&phone_details=${data.phone_details}&is_some_user=${data.is_some_user}&other_telco=${data.other_telco}&mobile=${data.mobile}&user_id=${data.user_id}`
  // );
  let response = postApiData(`/package-screen-wc`, data);
  return response;
};

export const sendOTPApi = async (data) => {
  // let response = postApiData(
  //   `/sign-up-wc?from_screen=${data.from_screen}&telco=${data.telco}&mobile=${data.mobile}&device=${data.device}&device_id=${data.device_id}&is_header_enrichment=${data.is_header_enrichment}&other_telco=${data.other_telco}&phone_details=${data.phone_details}`
  // );
  let response = postApiData(`/sign-up-wc`, data);
  return response;
};

export const verifyOtp = async (data) => {
  let response = postApiData(`/authentication-wc`, data);
  // let response = postApiData(
  //   `/authentication-wc?
  //   type=${data.type}&otpId=${data.otpId}&phone_details=${data.phone_details}&code=${data.code}&telco=${data.telco}&service_class=${data.service_class}&other_telco=${data.other_telco}&mobile=${data.mobile}&user_id=${data.user_id}&device_id=${data.device_id}&is_some_user=${data.is_some_user}&opId=${data.opId}`
  // );

  return response;
};

export const resendOtp = async (data) => {
  let response = postApiData(`/send-otp-wc`, data);
  return response;
};

export const checkSubscribeDbssAPI = async (data) => {
  let response = postApiData(`/check-subscribe-dbss`, data);

  return response;
};

export const subScribeDbssAPI = async (data) => {
  let response = postApiData(`/subscribe-dbss`, data);

  return response;
};
export const subScribeDbsszAPI = async (data) => {
  let response = postApiData(`/subscribe-other-wc`, data);

  return response;
};

export const easymoneyFirst = async (data) => {
  let response = getApiData(
    `/transaction?mobile=${data.mobile}&easypay_mobile=${data.easypay_mobile}&user_id=${data.user_id}&package_id=${data.package_id}&email=${data.email}&telco=${data.telco}&is_some_user=${data.is_some_user}`
  );
  return response;
};

export const easymoneySecond = async (data) => {
  let response = getApiData(
    `/otpTransaction?mobile=${data.mobile}&easypay_mobile=${data.easypay_mobile}&user_id=${data.user_id}&package_id=${data.package_id}&email=${data.email}&telco=${data.telco}&is_some_user=${data.is_some_user}&otp=${data.otp}`
  );
  return response;
};
