import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLogin } from "../utilities/inputValidation.js";
import User from "../model/User.js";

async function loginController(req, res, next) {
	const { username, password } = req.body;

	// Check for falsy inputs
	const isValid = validateLogin(username, password);
	if (!isValid) {
		res.status(400).json({
			message: "invalid input fields",
		});
		return;
	}

	const user = await User.findOne({ username }).exec();
	if (!user) {
		res.status(401).json({
			message: "invalid credentials",
		});
		return;
	}

	// Verifying Password
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		res.status(401).json({
			message: "invalid credentials",
		});
		return;
	}

	// Generate tokens
	const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
	const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

	// Save refresh token
	user.refreshToken = refreshToken;
	await user.save();

	// Send tokens to user
	res.cookie("jwt", refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken });
}

export default loginController;