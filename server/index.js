import express from "express";
import cors from "cors";
import corsConfig from "./configs/corsConfigs.js";

const __PORT = 5000;
const app = express();

// Routes
import signupRoute from "./routes/signupRoute.js";

// Cors
app.use(
	cors({
		origin: corsConfig.origin,
	})
);

app.listen(__PORT, () => {
	console.log(`Server running on port ${__PORT}`);
});
