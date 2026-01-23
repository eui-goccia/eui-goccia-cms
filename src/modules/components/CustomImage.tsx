'use client';

import type { Image as ImageType } from '@payload-types';
import Image from 'next/image';
import { useRef } from 'react';
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
	const imgRef = useRef<HTMLImageElement>(null);
	const sizeData = image?.sizes?.[size];
	const src = sizeData?.url ?? image?.url ?? '/og-image.webp';
	const blurDataURL = image?.blurHash ?? DEFAULT_BLUR_PLACEHOLDER;
	const refinedAlt = image?.alt ?? image?.caption ?? alt ?? '';
	const width = sizeData?.width ?? image?.width ?? 300;
	const height = sizeData?.height ?? image?.height ?? 300;

	const handleLoad = () => {
		imgRef.current?.classList.remove('blur-sm');
		imgRef.current?.classList.add('blur-0');
	};

	const handleError = () => {
		imgRef.current?.classList.remove('blur-sm');
		imgRef.current?.classList.add('blur-0');
	};

	return (
		<>
			<Image
				alt={refinedAlt}
				blurDataURL={blurDataURL}
				className={cn(
					'h-full w-full duration-500 ease-in-out blur-sm',
					className
				)}
				height={height}
				loading={loading}
				onError={handleError}
				onLoad={handleLoad}
				placeholder='blur'
				priority={priority}
				quality={quality}
				ref={imgRef}
				sizes={sizes ?? DEFAULT_SIZES[size]}
				src={src}
				width={width}
			/>
			{showCaption && image?.caption ? (
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
