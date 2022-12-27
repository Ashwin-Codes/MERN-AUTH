import { useEffect } from "react";
import routes from "../config/routes.json";
import axios from "../api/axios";
import { axiosPrivate } from "../api/axios";
import { useSelector } from "react-redux";
import { getAuthState } from "../features/auth/authSlice";

export default function useNetworkRequest() {
	const auth = useSelector(getAuthState);

	useEffect(() => {
		const addAuthIntercept = axiosPrivate.interceptors.request.use((config) => {
			if (!config.headers["Authorization"]) {
				config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
			}
			return config;
		});

		return () => {
			axiosPrivate.interceptors.request.eject(addAuthIntercept);
		};
	}, [auth.accessToken]);

	async function signUpRequest(credentials, errorCb, headers = {}) {
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
	}

	async function loginRequest(credentials, errorCb, headers = {}) {
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
	}

	async function quotesRequest() {
		const response = await axiosPrivate.get(routes.quotes, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	}

	async function logoutRequest(errorCb) {
		try {
			const response = await axios.get(routes.logout, { withCredentials: true });
			return response;
		} catch (err) {
			errorCb();
		}
	}

	return { signUpRequest, loginRequest, quotesRequest, logoutRequest };
}
