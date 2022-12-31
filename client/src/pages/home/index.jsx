import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuotes } from "../../features/quotes/quoteSlice";
import usePrivateNetworkRequest from "../../hooks/usePrivateNetworkRequest";

// Components
import QuotesList from "../../features/quotes/QuotesList";
import Navbar from "../../components/Navbar";

export default function Index() {
	const { quotesRequest } = usePrivateNetworkRequest();
	const dispatch = useDispatch();

	useEffect(() => {
		async function getQuotes() {
			const response = await quotesRequest();
			if (!response?.data) return;
			const quotes = response.data;
			dispatch(setQuotes(quotes));
		}

		getQuotes();
	}, [dispatch, quotesRequest]);

	return (
		<>
			<Navbar />
			<div className="bg-gray-400 flex justify-center items-center h-screen">
				<QuotesList />
			</div>
		</>
	);
}
