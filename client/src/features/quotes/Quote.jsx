export default function Quote({ quote, author }) {
	return (
		<div className="quote-container">
			<div className="quote bg-gray-800 text-white px-4 py-2 rounded-lg">
				<p>
					{quote} - <span className="text-cyan-400">{author}</span>
				</p>
			</div>
		</div>
	);
}
