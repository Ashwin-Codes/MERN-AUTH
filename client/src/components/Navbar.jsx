import { BiUserCircle as UserIcon } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getAuthState, logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import useNetworkRequest from "../hooks/useNetworkRequest";
import { ToastContainer, toast } from "react-toastify";

export default function Navbar() {
	const auth = useSelector(getAuthState);
	const dispatch = useDispatch();
	const { logoutRequest } = useNetworkRequest();

	async function handleLogout() {
		function showErrorToast() {
			toast.error("Something went wrong");
		}

		const response = await logoutRequest(showErrorToast);
		if (response?.status === 200) {
			dispatch(logout());
			return;
		}
	}

	return (
		<>
			<ToastContainer position="top-center" autoClose={2000} />
			<div className="navbar-container absolute left-0 right-0 bg-white w-[95%] mx-auto mt-2 rounded-xl">
				<div className="navbar flex px-4 py-2 justify-between items-center mx-auto md:w-11/12">
					<div className="user-info flex text-white items-center justify-center">
						<UserIcon className="text-2xl text-gray-600" />
						<p className="ml-1 text-gray-600">{auth.username}</p>
					</div>
					<button className="logout-btn text-white bg-gray-700 px-4 py-2 rounded-xl" onClick={handleLogout}>
						Log Out
					</button>
				</div>
			</div>
		</>
	);
}
