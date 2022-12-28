// Hooks
import { useState, useRef, useEffect } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import useNetworkRequest from "../../hooks/useNetworkRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../../features/auth/authSlice";

// Icons
import { BiUserCircle as UsernameIcon } from "react-icons/bi";
import { RiLockPasswordLine as PasswordIcon } from "react-icons/ri";
import { FaSpinner as SpinnerIcon } from "react-icons/fa";

// Packages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuth } from "../../features/auth/authSlice";

// Config
import routes from "../../config/routes.json";

export default function Index() {
	const usernameParentRef = useRef();
	const passwordParentRef = useRef();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const auth = useSelector(getAuthState);
	const { validateUsername, validatePassword } = useFormValidator();
	const { loginRequest } = useNetworkRequest();

	const dispatch = useDispatch();

	const errorClassText = "!text-red-700";
	const errorClassBorder = "!border-red-700";

	// Check if allready logged in
	useEffect(() => {
		if (auth?.accessToken) {
			navigate("/home"); // Navigate to home if logged in
		}
	}, [auth, navigate]);

	async function handleSubmit(e) {
		e.preventDefault();
		const usernameIsValid = validateUsername(username);
		const passwordIsValid = validatePassword(password);

		const formIsValid = usernameIsValid && passwordIsValid;

		let focused = false;

		// Handle error UI
		if (!formIsValid) {
			if (!usernameIsValid) {
				usernameParentRef.current.children[0].classList.add(errorClassText);
				usernameParentRef.current.classList.add(errorClassBorder);
				if (!focused) {
					usernameParentRef.current.children[1].focus();
					focused = true;
				}
			}
			if (!passwordIsValid) {
				passwordParentRef.current.children[0].classList.add(errorClassText);
				passwordParentRef.current.classList.add(errorClassBorder);
				if (!focused) {
					passwordParentRef.current.children[1].focus();
					focused = true;
				}
			}
			return;
		}

		const payload = {
			username,
			password,
		};

		function errorCallback(err) {
			setIsLoading(false);
			if (err?.response?.status === 401) {
				if (err?.response?.data?.message === "invalid credentials") {
					toast.error("Username or password incorrect");
					return;
				}
			}
			toast.error("Something went wrong, please try again later");
		}
		setIsLoading(true);
		const response = await loginRequest(payload, errorCallback);
		if (!response) return;

		dispatch(
			setAuth({
				username: payload.username,
				accessToken: response.data.accessToken,
			})
		);

		setIsLoading(false);
		navigate(routes.home);
	}

	function handleUsernameValidation(username) {
		const isValid = validateUsername(username);
		if (!isValid) {
			usernameParentRef.current.children[0].classList.add(errorClassText);
			usernameParentRef.current.classList.add(errorClassBorder);
			return;
		}
		usernameParentRef.current.children[0].classList.remove(errorClassText);
		usernameParentRef.current.classList.remove(errorClassBorder);
	}

	function handlePasswordValidation(password) {
		const isValid = validatePassword(password);
		if (!isValid) {
			passwordParentRef.current.children[0].classList.add(errorClassText);
			passwordParentRef.current.classList.add(errorClassBorder);
			return;
		}
		passwordParentRef.current.children[0].classList.remove(errorClassText);
		passwordParentRef.current.classList.remove(errorClassBorder);
	}

	return (
		<>
			<ToastContainer position="top-center" autoClose={2000} />
			<div className="form-container w-screen h-screen flex justify-center items-center">
				<div className="form px-8 py-4">
					<h1 className="text-5xl my-auto text-center font-bold text-gray-700">Login</h1>
					<form className="flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
						<div className="input-field flex flex-col ">
							<label htmlFor="username" className="font-bold text-gray-500 text-xl">
								Username
							</label>
							<div
								className="flex justify-center items-center border-2 border-slate-200 rounded-lg px-2"
								ref={usernameParentRef}>
								<UsernameIcon className="text-4xl text-slate-300 w-[10%]" />
								<input
									onChange={(e) => {
										setUsername(e.target.value);
										handleUsernameValidation(e.target.value);
									}}
									autoComplete="username"
									type="text"
									id="username"
									placeholder="Username"
									className="min-w-0 outline-none px-1 h-12 w-[90%]"
								/>
							</div>
						</div>
						<div className="input-field flex flex-col">
							<label htmlFor="password" className="font-bold text-gray-500 text-xl">
								Password
							</label>
							<div
								className="flex justify-center items-center border-2 border-slate-200 rounded-lg px-2"
								ref={passwordParentRef}>
								<PasswordIcon className="text-4xl text-slate-300 w-[10%]" />
								<input
									onChange={(e) => {
										setPassword(e.target.value);
										handlePasswordValidation(e.target.value);
									}}
									autoComplete="new-password"
									type="password"
									id="password"
									placeholder="Password"
									className="min-w-0 outline-none px-1 h-12 w-[90%]"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="bg-gray-700 h-12 rounded-xl text-white text-xl font-bold flex justify-center items-center"
							disabled={isLoading}>
							{!isLoading && "Login"}
							{isLoading && <SpinnerIcon className="animate-spin" />}
						</button>
					</form>
					<div className="mt-2">
						<p className="text-gray-500">Don't have an account ?</p>
						<button
							className="bg-gray-700 rounded-md text-white text-sm px-3 py-1"
							onClick={() => {
								navigate(routes.signup);
							}}>
							Register
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
