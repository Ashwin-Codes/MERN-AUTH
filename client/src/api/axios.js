import axios from "axios";
import routes from "../config/routes.json";

export default axios.create({ baseURL: routes.baseUrl });
export const axiosPrivate = axios.create({ baseURL: routes.baseUrl, withCredentials: true });
