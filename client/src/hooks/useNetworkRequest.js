import axios from "axios";
import { useCallback } from "react";
import routes from "../config/routes.json";

const axiosRequest = axios.create({ baseURL: routes.baseUrl });

export default function useNetworkRequest() {
	const signUpRequest = useCallback(async (credentials, errorCb, headers = {}) => {
		try {
			const response = await axiosRequest.post(routes.signup, credentials, {
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});

			return response;
		} catch (err) {
			errorCb(err);
		}
	}, []);

	const loginRequest = useCallback(async (credentials, errorCb, headers = {}) => {
		try {
			const response = await axiosRequest.post(routes.login, credentials, {
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
			});
			return response;
		} catch (err) {
			errorCb(err);
		}
	}, []);

	return { signUpRequest, loginRequest };
}
