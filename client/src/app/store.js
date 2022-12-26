import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authSlice from "../features/auth/authSlice";
import quoteSlice from "../features/quotes/quoteSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		quotes: quoteSlice,
	},
});

export default store;
