import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	quotes: [],
};

const quoteSlice = createSlice({
	name: "quotes",
	initialState,
	reducers: {
		setQuotes(state, action) {
			state.quotes = action.payload;
		},
	},
});

export function getAllQuotes(state) {
	return state.quotes.quotes;
}

export const { setQuotes } = quoteSlice.actions;
export default quoteSlice.reducer;
