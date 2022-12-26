import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAuthState } from "../features/auth/authSlice";
import routes from "../config/routes.json";

export default function Protected({ children }) {
	const authState = useSelector(getAuthState);
	if (authState.username && authState.accessToken) {
		return children;
	}
	return <Navigate to={routes.login} />;
}
