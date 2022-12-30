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
			console.log("err : ", err);
		}
	}, [dispatch, refreshAccessRequest]);

	return { refresh };
}
