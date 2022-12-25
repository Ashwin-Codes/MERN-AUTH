import { Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/Protected";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/">
					<Route index element={<Navigate to={"/signup"} />} />
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
