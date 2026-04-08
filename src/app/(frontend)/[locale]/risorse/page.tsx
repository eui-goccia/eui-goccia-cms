import { notFound } from 'next/navigation';
import { RisorseContent } from '@/modules/components/risorse/RisorseContent';
import { RISORSE_ENABLED } from '@/modules/features/risorse';

export default function Risorse() {
	if (!RISORSE_ENABLED) {
		notFound();
	}

	return (
		<div className='bg-blu-300 min-h-screen'>
			{/* Hero Banner */}
			<div className='relative overflow-hidden rounded-[30px] bg-blu-500'>
				<p className='px-5 py-8 font-ghost varW600 text-blu-300 text-[80px] md:text-[120px] lg:text-[165px] uppercase tracking-wide leading-none'>
					ARCHIVIO
				</p>
			</div>

			{/* Red Filter Bar */}
			<div className='flex h-10 items-center gap-6 bg-rosso-500 px-5 md:px-10'>
				<p className='font-greed text-xl font-bold uppercase underline tracking-wide'>
					RICERCA PER FILTRI
				</p>
				<p className='font-greed text-xl uppercase tracking-wide'>TITOLO</p>
				<p className='font-greed text-xl uppercase tracking-wide'>DATA</p>
				<p className='font-greed text-xl uppercase tracking-wide'>KEYWORD</p>
			</div>

			{/* Main Content */}
			<RisorseContent />

			{/* Decorative Bottom */}
			<div className='h-[185px] bg-rosso-300' />
		</div>
	);
}
