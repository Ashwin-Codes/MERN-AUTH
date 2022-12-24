import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import corsConfig from "./configs/corsConfigs.js";
import connectDatabase from "./configs/dbConf.js";
import mongoose from "mongoose";
import signupRoute from "./routes/signupRoute.js";
import loginRoute from "./routes/loginRoute.js";

const __PORT = process.env.PORT || 5000;
const app = express();

// Database
mongoose.set("strictQuery", true);
connectDatabase();

// Middlewares
app.use(express.json());

// Cors
app.use(
	cors({
		origin: corsConfig.origin,
	})
);

// Routes
app.use(signupRoute);
app.use(loginRoute);

mongoose.connection.once("open", () => {
	app.listen(__PORT, () => {
		console.log(`Server running on port ${__PORT}`);
	});
});
