type WordsProps = {
	initial?: string;
	text: string;
};

export default function MarqueeLogo() {
	const words: WordsProps[] = [
		{ initial: 'G', text: 'reen' },
		{ initial: 'O', text: 'pportunities' },
		{ text: 'to' },
		{ initial: 'C', text: 'lean-up' },
		{ initial: 'C', text: 'ontaminants' },
		{ text: 'through' },
		{ text: 'an' },
		{ initial: 'I', text: 'nterspecies' },
		{ initial: 'A', text: 'lliance' },
	];

	return (
		<div className='inline-flex uppercase w-full flex-nowrap lg:text-7xl md:text-6xl text-5xl xl:text-8xl font-tagada bg-rosso-500 overflow-hidden'>
			<ul className='flex pt-3 animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-2 md:[&_li]:mx-4'>
				{words.map((word, index) => (
					<li key={`${word.initial}-${word.text}-${index}`}>
						<p className='whitespace-nowrap py-4'>
							<span className='text-blue-200'>{word.initial}</span>
							<span className='whitespace-nowrap'>{word.text}</span>
						</p>
					</li>
				))}
			</ul>
			<ul
				aria-hidden='true'
				className='flex pt-3 animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-2 md:[&_li]:mx-4'
			>
				{words.map((word, index) => (
					<li key={`${word.initial}-${word.text}-${index}`}>
						<p className='whitespace-nowrap py-4'>
							<span className='text-blue-200'>{word.initial}</span>
							<span className='whitespace-nowrap'>{word.text}</span>
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
