import axios from "axios";

const baseAxios = axios.create({
    baseURL: `http://localhost:80/buy-food`
});

export default baseAxios;