import { axiosPrivate } from "../api/axios";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState, relogin } from "../features/auth/authSlice";
import routes from "../config/routes.json";
import useRefreshAccess from "./useRefreshAccess";
import { useLocation } from "react-router-dom";

export default function usePrivateNetworkRequest() {
	const auth = useSelector(getAuthState);
	const { refresh } = useRefreshAccess();
	const dispatch = useDispatch();
	const location = useLocation();

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
					if (res.refreshTokenExpired) {
						dispatch(relogin({ from: location }));
						return;
					}
					error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
					return axiosPrivate(error.config);
				}
			}
		);

		return () => {
			axiosPrivate.interceptors.request.eject(addAuthIntercept);
			axiosPrivate.interceptors.response.eject(refreshAccessTokenIntercept);
		};
	}, [auth, refresh, dispatch, location]);

	const quotesRequest = useCallback(async () => {
		try {
			const response = await axiosPrivate.get(routes.quotes, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response;
		} catch (err) {
			console.error(err);
		}
	}, []);

	return { quotesRequest };
}
