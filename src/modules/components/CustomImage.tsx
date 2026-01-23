/** biome-ignore-all lint/style/noNestedTernary: faster to write */
'use client';

import type { Image as ImageType } from '@payload-types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface Props {
	image: ImageType | undefined;
	size: 'thumbnail' | 'medium' | 'large' | 'og' | 'xlarge';
	alt?: string;
	className?: string;
	captionClassName?: string;
	quality?: number;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
	showCaption?: boolean;
	sizes?: string;
}

// Valid base64 placeholder - 1x1 transparent PNG
const DEFAULT_BLUR_PLACEHOLDER =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// Default sizes based on image size prop
const DEFAULT_SIZES: Record<Props['size'], string> = {
	thumbnail: '(max-width: 640px) 100vw, 256px',
	medium: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px',
	large: '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1024px',
	og: '1200px',
	xlarge: '100vw',
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
	sizes,
}: Props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const src = image?.sizes?.[size]?.url || image?.url || '/og-image.webp';
	const blurDataURL = image?.blurHash || DEFAULT_BLUR_PLACEHOLDER;

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
				sizes={sizes || DEFAULT_SIZES[size]}
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
