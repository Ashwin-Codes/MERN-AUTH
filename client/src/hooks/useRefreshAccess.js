import { useCallback } from "react";
import useNetworkRequest from "./useNetworkRequest";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/auth/authSlice";

export default function useRefreshAccess() {
	const { refreshAccessRequest } = useNetworkRequest();
	const dispatch = useDispatch();
	const refresh = useCallback(async () => {
		try {
			const response = await refreshAccessRequest();
			if (response?.response?.status === 401 && response?.response?.data?.message === "refresh token expired") {
				return { refreshTokenExpired: true };
			}
			if (response?.status === 200) {
				dispatch(
					setAuth({
						username: response?.data?.username,
						accessToken: response?.data?.accessToken,
					})
				);
			}
			return response;
		} catch (err) {
			console.log(err);
		}
	}, [dispatch, refreshAccessRequest]);

	return { refresh };
}
