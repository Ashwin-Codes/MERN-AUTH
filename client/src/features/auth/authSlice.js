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
		logout(state, action) {
			state.username = null;
			state.accessToken = null;
		},
	},
});

export function getAuthState(state) {
	return state.auth;
}

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
