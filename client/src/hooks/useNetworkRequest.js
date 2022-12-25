import axios from "axios";
import { useCallback } from "react";
import routes from "../config/routes.json";

const axiosRequest = axios.create({ baseURL: routes.baseUrl });

export default function useNetworkRequest() {
	const signUpRequest = useCallback(async (jsonObj, callbackFunc, headers = {}) => {
		try {
			const response = await axiosRequest.post(routes.signup, jsonObj, {
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});

			return response;
		} catch (err) {
			callbackFunc(err);
		}
	}, []);

	return { signUpRequest };
}
