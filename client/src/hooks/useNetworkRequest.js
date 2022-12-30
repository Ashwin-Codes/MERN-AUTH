import { useCallback } from "react";
import routes from "../config/routes.json";
import axios from "../api/axios";

export default function useNetworkRequest() {
	const signUpRequest = useCallback(async (credentials, errorCb, headers = {}) => {
		try {
			const response = await axios.post(routes.signup, credentials, {
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
			const response = await axios.post(routes.login, credentials, {
				headers: {
					"Content-Type": "application/json",
					...headers,
				},
				withCredentials: true,
			});
			return response;
		} catch (err) {
			errorCb(err);
		}
	}, []);

	const logoutRequest = useCallback(async (errorCb) => {
		try {
			const response = await axios.get(routes.logout, { withCredentials: true });
			return response;
		} catch (err) {
			errorCb();
		}
	}, []);

	const refreshAccessRequest = useCallback(async () => {
		try {
			const response = await axios.get(routes.refresh, { withCredentials: true });
			return response;
		} catch (err) {}
	}, []);

	return { signUpRequest, loginRequest, logoutRequest, refreshAccessRequest };
}
