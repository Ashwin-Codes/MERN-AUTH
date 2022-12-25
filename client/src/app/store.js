import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authSlice from "../features/authSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
});

export default store;
