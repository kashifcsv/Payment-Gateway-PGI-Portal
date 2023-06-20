import axios from "axios";

const axiosService = axios.create({
  baseURL: "https://someurl/index.php/users-dbss",
});

const axiosService2 = axios.create({
  baseURL: "https://someurlservices/easypaysecureapi",
});

axiosService.interceptors.request.use(
  (config) => {
    document.getElementById("loader").style.display = "block";
    document.getElementById("routeContainer").style.opacity = "10%";
    config.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

    return config;
  },
  (error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    console.log("request: ", error);
    return Promise.reject(error);
  }
);

axiosService2.interceptors.request.use(
  (config) => {
    document.getElementById("loader").style.display = "block";
    document.getElementById("routeContainer").style.opacity = "10%";
    config.headers.common["TOKEN"] = "kk4a719oicaa6xc97bg12elij5buj69dmkcdt8jkf";

    return config;
  },
  (error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    console.log("request: ", error);
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    return response;
  },
  (error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    console.log("response: ", error);
    return Promise.reject(error);
  }
);

axiosService2.interceptors.response.use(
  (response) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    return response;
  },
  (error) => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("routeContainer").style.opacity = "100%";
    console.log("response: ", error);
    return Promise.reject(error);
  }
);

export const postApiData = async (endpoint, data) => {
  try {
    const response = await axiosService.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getApiData = async (endpoint, data) => {
  try {
    const response = await axiosService2.get(endpoint, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
