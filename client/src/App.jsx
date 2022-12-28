import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";
import useRefreshAccess from "./hooks/useRefreshAccess";
import { getAuthState } from "./features/auth/authSlice";
import { useSelector } from "react-redux";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";

export default function App() {
	const auth = useSelector(getAuthState);
	const { refresh } = useRefreshAccess();

	useEffect(() => {
		if (!auth?.accessToken) {
			refresh();
		}
	}, [auth, refresh]);

	return (
		<>
			<Routes>
				<Route path="/">
					<Route index element={<Navigate to={"home"} />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
					<Route
						path="home"
						element={
							<Protected>
								<Home />
							</Protected>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}
