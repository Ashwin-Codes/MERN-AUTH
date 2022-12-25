import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	accessToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action) {
			state.username = action.payload.username;
			state.accessToken = action.payload.accessToken;
		},
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
