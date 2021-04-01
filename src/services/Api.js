import axios from "axios";

axios.defaults.baseURL = "http://buy-food.azurewebsites.net/buy-food";
// axios.defaults.baseURL = "http://localhost:80/buy-food";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS"

export default axios;
