// Hooks
import { useState, useRef } from "react";
import useFormValidator from "../../hooks/useFormValidator";
import useNetworkRequest from "../../hooks/useNetworkRequest";
import { useNavigate } from "react-router-dom";

// Icons
import { BiUserCircle as UsernameIcon } from "react-icons/bi";
import { BiMailSend as MailIcon } from "react-icons/bi";
import { RiLockPasswordLine as PasswordIcon } from "react-icons/ri";
import { FaSpinner as SpinnerIcon } from "react-icons/fa";

// Packages
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Config
import routes from "../../config/routes.json";

export default function Index() {
	const usernameParentRef = useRef();
	const emailParentRef = useRef();
	const passwordParentRef = useRef();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { validateUsername, validateEmail, validatePassword } = useFormValidator();
	const { signUpRequest } = useNetworkRequest();

	const errorClassText = "text-red-700";
	const errorClassBorder = "border-red-700";

	async function handleSubmit(e) {
		e.preventDefault();
		const usernameIsValid = validateUsername(username);
		const emailIsValid = validateEmail(email);
		const passwordIsValid = validatePassword(password);
		const formIsValid = usernameIsValid && emailIsValid && passwordIsValid;

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
			if (!emailIsValid) {
				emailParentRef.current.children[0].classList.add(errorClassText);
				emailParentRef.current.classList.add(errorClassBorder);
				if (!focused) {
					emailParentRef.current.children[1].focus();
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
			email,
			password,
		};

		function errorCallback(err) {
			setIsLoading(false);
			if (err?.response?.status === 409) {
				if (err?.response?.data?.message === "username not available") {
					toast.error("Username not available");
					return;
				}
				if (err?.response?.data?.message === "email already in use") {
					toast.error("Email already in use");
					return;
				}
			}
			toast.error("Something went wrong, please try again later");
		}
		setIsLoading(true);
		const response = await signUpRequest(payload, errorCallback);
		if (!response) return;
		setIsLoading(false);
		toast.success("Account Created Successfully.");
		setTimeout(() => {
			navigate(routes.login);
		}, 3000);
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

	function handleEmailValidation(email) {
		const isValid = validateEmail(email);
		if (!isValid) {
			emailParentRef.current.children[0].classList.add(errorClassText);
			emailParentRef.current.classList.add(errorClassBorder);
			return;
		}
		emailParentRef.current.children[0].classList.remove(errorClassText);
		emailParentRef.current.classList.remove(errorClassBorder);
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
					<h1 className="text-5xl my-auto text-center font-bold text-gray-700">Sign Up</h1>
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
							<label htmlFor="email" className="font-bold text-gray-500 text-xl">
								Email Address
							</label>
							<div
								className="flex justify-center items-center border-2 border-slate-200 rounded-lg px-2"
								ref={emailParentRef}>
								<MailIcon className="text-4xl text-slate-300 w-[10%]" />
								<input
									onChange={(e) => {
										setEmail(e.target.value);
										handleEmailValidation(e.target.value);
									}}
									autoComplete="email"
									type="email"
									id="email"
									placeholder="Email"
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
							className="bg-gray-700  h-12 rounded-xl text-white text-xl font-bold flex justify-center items-center"
							disabled={isLoading}>
							{!isLoading && "Sign Up"}
							{isLoading && <SpinnerIcon className="animate-spin" />}
						</button>
					</form>
					<div className="mt-2">
						<p className="text-gray-500">Already have an account ?</p>
						<button
							className="bg-gray-700 rounded-md text-white text-sm px-3 py-1"
							onClick={() => {
								navigate(routes.login);
							}}>
							Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
