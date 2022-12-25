import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/login";

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/">
					<Route index element={<Navigate to={"/signup"} />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
}
