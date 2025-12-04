/** biome-ignore-all lint/style/noNestedTernary: faster to write */
'use client';

import type { Image as ImageType } from '@payload-types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

type Props = {
	image: ImageType | undefined;
	size: 'thumbnail' | 'medium' | 'large' | 'og' | 'xlarge';
	alt?: string;
	className?: string;
	captionClassName?: string;
	quality?: number;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
	showCaption?: boolean;
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: faster to write
export function CustomImage({
	image,
	alt,
	size,
	className,
	quality = 60,
	priority = false,
	loading = 'lazy',
	showCaption = false,
	captionClassName,
}: Props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const src = image?.sizes?.[size]?.url || image?.url || '/og-image.webp';
	const blurDataURL =
		image?.blurHash ||
		'data:image/png;base64,WERy8KHe?ErexDer%3WVaxoLWBj[}cnlE0S4SdofM{ofogR*t7ay';

	const refined_alt = image
		? image.alt || image.caption || alt || ''
		: alt || '';

	const caption = showCaption && image?.caption;
	return (
		<>
			<Image
				alt={refined_alt}
				blurDataURL={blurDataURL}
				className={cn(
					className,
					`duration-500 ease-in-out ${isLoaded ? 'blur-0' : 'blur-sm'}`,
					'h-full w-full'
				)}
				height={
					image
						? image.sizes?.[size]?.height
							? image.sizes?.[size]?.height
							: image.height || 300
						: 300
				}
				loading={loading}
				onLoad={() => setIsLoaded(true)}
				placeholder='blur'
				priority={priority}
				quality={quality}
				src={src}
				width={
					image
						? image.sizes?.[size]?.width
							? image.sizes?.[size]?.width
							: image.width || 300
						: 300
				}
			/>
			{caption ? (
				<p
					className={cn(
						'font-greed varW600 text-lg w-full mb-2 flex items-start',
						captionClassName
					)}
				>
					{image.caption}
				</p>
			) : null}
		</>
	);
}
