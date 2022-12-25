import { useCallback } from "react";
import passwordValidator from "password-validator";

const passwordSchema = new passwordValidator();
passwordSchema.is().min(8).is().max(30).has().uppercase().has().lowercase().has().digits(2);

const validationRegex = {
	username: /^[^\W_](?!.*?[._]{2})[\w.]{6,18}[^\W_]$/,
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export default function useFormValidator() {
	const validateUsername = useCallback((username) => {
		if (username.match(validationRegex.username)) return true;
		return false;
	}, []);

	const validateEmail = useCallback((email) => {
		if (email.match(validationRegex.email)) return true;
		return false;
	}, []);

	const validatePassword = useCallback((password) => {
		if (passwordSchema.validate(password)) return true;
		return false;
	}, []);

	return { validateUsername, validateEmail, validatePassword };
}
