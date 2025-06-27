import Image from 'next/image';
import CellPattern1 from '@/assets/images/meta/CellPattern_1.webp';
import { cn } from '@/modules/utilities/cnUtils';

interface CellDataProps {
	data?: string;
	dataClass?: string;
	caption?: string;
	captionClass?: string;
}

export default function CellData({
	data,
	dataClass,
	caption,
	captionClass,
}: CellDataProps) {
	return (
		<div className='aspect-3/2 text-blu-300 p-5 md:p-10 relative flex items-center justify-center flex-col bg-blu-500 w-full h-full rounded-2xl'>
			{data && (
				<h3
					className={cn(
						'font-tagada text-6xl sm:text-7xl md:text-8xl text-center text-balance',
						dataClass
					)}
				>
					{data}
				</h3>
			)}
			{caption && (
				<p
					className={cn(
						'xl:text-3xl md:text-2xl text-xl font-greed uppercase text-balance text-center',
						captionClass
					)}
				>
					{caption}
				</p>
			)}
			<Image
				className='w-full h-full rounded-2xl absolute inset-0 object-center z-0 object-cover'
				src={CellPattern1}
				fill={true}
				sizes='(max-width: 1023px) 100vw, 50vw'
				alt=''
			/>
		</div>
	);
}
