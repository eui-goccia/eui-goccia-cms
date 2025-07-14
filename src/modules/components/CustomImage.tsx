'use client';

import type { Image as ImageType } from '@payload-types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

type Props = {
	image: ImageType | undefined;
	size: 'thumbnail' | 'medium' | 'large' | 'og' | 'xlarge';
	alt: string;
	className?: string;
	captionClassName?: string;
	quality?: number;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
	showCaption?: boolean;
};

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

	const refined_alt = image ? image.alt || image.caption || alt : alt;
	return (
		<>
			<Image
				className={cn(
					className,
					`duration-500 ease-in-out ${isLoaded ? 'blur-0' : 'blur-sm'}`,
					`h-full w-full`
				)}
				priority={priority}
				width={
					image
						? image.sizes?.[size]?.width
							? image.sizes?.[size]?.width
							: image.width || 300
						: 300
				}
				height={
					image
						? image.sizes?.[size]?.height
							? image.sizes?.[size]?.height
							: image.height || 300
						: 300
				}
				src={src}
				alt={refined_alt}
				quality={quality}
				placeholder='blur'
				blurDataURL={blurDataURL}
				loading={loading}
				onLoad={() => setIsLoaded(true)}
			/>
			{showCaption && image?.caption && (
				<p
					className={cn(
						'font-greed varW600 text-lg w-full mb-2 flex items-start',
						captionClassName
					)}
				>
					{image.caption}
				</p>
			)}
		</>
	);
}
