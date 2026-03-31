import { Link } from '@/i18n/routing';

interface ResourceRowProps {
	description: string;
	date: string;
	secondaryDescription: string;
	reference: string;
	slug: string;
}

export function ResourceRow({
	description,
	date,
	secondaryDescription,
	reference,
	slug,
}: ResourceRowProps) {
	return (
		<Link
			className='block border-b border-black/20 py-5 transition-colors hover:bg-black/5'
			href={`/risorse/${slug}`}
		>
			<div className='grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto_1fr_auto_auto]'>
				<p className='font-greed text-lg leading-[1.1] tracking-wide'>
					{description}
				</p>
				<p className='font-greed text-lg leading-[1.1] tracking-wide'>{date}</p>
				<p className='font-greed text-lg leading-[1.1] tracking-wide'>
					{secondaryDescription}
				</p>
				<p className='font-greed text-lg leading-[1.1] tracking-wide'>
					{reference}
				</p>
				<span className='font-greed text-4xl leading-none'>+</span>
			</div>
		</Link>
	);
}
