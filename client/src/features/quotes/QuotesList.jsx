import { useSelector } from "react-redux";
import { getAllQuotes } from "./quoteSlice";
import Quote from "./Quote";

export default function QuotesList() {
	const quotes = useSelector(getAllQuotes);
	return (
		<div className="Quoteslist px-4 py-2 flex flex-col gap-4">
			<h1 className="text-center text-5xl mb-4 text-gray-200 font-extrabold">Quotes</h1>
			{quotes.map((quote) => {
				return <Quote quote={quote.quote} author={quote.author} key={quote._id} />;
			})}
		</div>
	);
}
