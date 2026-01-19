'use client';

import type { VideoBlock } from '@payload-types';
import type React from 'react';
import ReactPlayer from 'react-player';
import { cn } from '@/modules/utilities/cnUtils';

const aspectRatioClasses: Record<string, string> = {
	'16/9': 'aspect-video',
	'4/3': 'aspect-4/3',
	'1/1': 'aspect-square',
	'9/16': 'aspect-9/16',
};

const widthClasses: Record<string, string> = {
	full: 'w-full',
	half: 'w-1/2',
	third: 'w-1/3',
};

const horizontalAlignClasses: Record<string, string> = {
	left: 'mr-auto',
	center: 'mx-auto',
	right: 'ml-auto',
};

export const VideoBlockComponent: React.FC<{
	blockData: VideoBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { url, title, caption, light, aspectRatio, width, horizontal } =
		blockData;

	// Provide fallbacks for nullable values
	const aspectRatioValue = aspectRatio ?? '16/9';
	const widthValue = width ?? 'full';
	const horizontalValue = horizontal ?? 'center';
	const lightValue = light ?? true;

	if (!url) {
		return null;
	}

	return (
		<figure
			className={cn(
				widthClasses[widthValue] ?? 'w-full',
				horizontalAlignClasses[horizontalValue] ?? 'mx-auto',
				className
			)}
		>
			<div
				className={cn(
					'relative rounded-2xl overflow-hidden',
					aspectRatioClasses[aspectRatioValue] ?? 'aspect-video'
				)}
			>
				<ReactPlayer
					controls
					height='100%'
					light={lightValue}
					src={url}
					style={{ position: 'absolute', top: 0, left: 0 }}
					title={title ?? undefined}
					width='100%'
				/>
			</div>
			{caption && (
				<figcaption className='mt-2 text-sm text-gray-600'>
					{caption}
				</figcaption>
			)}
		</figure>
	);
};
