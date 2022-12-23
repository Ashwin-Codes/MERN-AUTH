import express from "express";
const __PORT = 5000;
const app = express();

// Routes
import signupRoute from "./routes/signupRoute.js";

app.listen(__PORT, () => {
	console.log(`Server running on port ${__PORT}`);
});
