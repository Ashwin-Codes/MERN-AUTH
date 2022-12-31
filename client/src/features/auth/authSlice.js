import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	accessToken: null,
	relogin: null,
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
		relogin(state, action) {
			state.username = null;
			state.accessToken = null;
			state.relogin = action.payload.from;
		},
	},
});

export function getAuthState(state) {
	return state.auth;
}

export const { setAuth, logout, relogin } = authSlice.actions;
export default authSlice.reducer;
