import axios from "axios";

axios.defaults.baseURL = "https://buy-food.azurewebsites.net/buy-food";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS"

export default axios;
