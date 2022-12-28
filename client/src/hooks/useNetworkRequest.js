import routes from "../config/routes.json";
import axios from "../api/axios";

export default function useNetworkRequest() {
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

	async function logoutRequest(errorCb) {
		try {
			const response = await axios.get(routes.logout, { withCredentials: true });
			return response;
		} catch (err) {
			errorCb();
		}
	}

	async function refreshAccessRequest() {
		try {
			const response = await axios.get(routes.refresh, { withCredentials: true });
			return response;
		} catch (err) {}
	}

	return { signUpRequest, loginRequest, logoutRequest, refreshAccessRequest };
}
