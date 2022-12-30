import { axiosPrivate } from "../api/axios";
import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "../features/auth/authSlice";
import routes from "../config/routes.json";
import useRefreshAccess from "./useRefreshAccess";

export default function usePrivateNetworkRequest() {
	const auth = useSelector(getAuthState);
	const { refresh } = useRefreshAccess();

	useEffect(() => {
		// Add auth header to all private requests
		const addAuthIntercept = axiosPrivate.interceptors.request.use((config) => {
			if (!config.headers["Authorization"]) {
				config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
			}
			return config;
		});

		// Refresh access token if expired and retry private request
		const refreshAccessTokenIntercept = axiosPrivate.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				if (error.response.status === 403 && !error.config.sent) {
					error.config.sent = true;
					const res = await refresh();
					error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
					return axiosPrivate(error.config);
				}
			}
		);

		return () => {
			axiosPrivate.interceptors.request.eject(addAuthIntercept);
			axiosPrivate.interceptors.response.eject(refreshAccessTokenIntercept);
		};
	}, [auth, refresh]);

	const quotesRequest = useCallback(async () => {
		try {
			const response = await axiosPrivate.get(routes.quotes, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response;
		} catch (err) {
			console.error(err.message);
		}
	}, []);

	return { quotesRequest };
}
