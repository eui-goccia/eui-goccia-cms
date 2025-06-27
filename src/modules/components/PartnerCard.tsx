import Image, { type StaticImageData } from 'next/image';
import React, { type ComponentType } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface PartnerCardProps {
	bgColor: string;
	partnerName: string;
	partnerBio: string;
	logo: ComponentType<React.SVGProps<SVGSVGElement>> | StaticImageData;
	members?: string;
}

export default function PartnerCard({
	bgColor,
	partnerName,
	partnerBio,
	logo,
	members,
}: PartnerCardProps) {
	return (
		<div
			className={cn(
				bgColor,
				'w-full rounded-3xl p-5  md:p-8 lg:p-12 flex flex-col justify-between gap-4 md:gap-8'
			)}
		>
			{/* Row 1 */}
			<div>
				<h2 className='lg:text-7xl md:text-6xl sm:text-5xl text-4xl xl:text-8xl varW600 font-ghost uppercase md:mb-6 text-balance text-black'>
					{partnerName}
				</h2>
			</div>

			{/* Row 2 */}
			<div className='flex md:flex-row flex-col gap-5 md:gap-10'>
				<div className='w-full md:w-3/4  space-y-10'>
					<p className='text-black text-xl md:text-2xl font-greed'>
						{partnerBio}
					</p>
					{members && (
						<div className='flex flex-col gap-2'>
							<h3 className='font-tagada text-4xl uppercase'>Partners</h3>
							<p className='font-ghost varW600 tracking-wide text-balance text-lg sm:text-xl md:text-2xl lg:text-3xl'>
								{members}
							</p>
						</div>
					)}
				</div>
				<div className='w-full md:w-1/4 flex justify-start md:justify-end items-start'>
					{logo &&
						(typeof logo === 'object' && 'src' in logo ? (
							<Image
								src={logo}
								alt={partnerName}
								quality={90}
								className='w-auto h-full max-h-20 max-w-60 object-contain'
							/>
						) : (
							React.createElement(
								logo as ComponentType<React.SVGProps<SVGSVGElement>>,
								{
									className: 'max-h-20 max-w-60',
								}
							)
						))}
				</div>
			</div>
		</div>
	);
}
