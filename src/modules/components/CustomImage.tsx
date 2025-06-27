'use client';

import type { Image as ImageType } from '@payload-types';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

type Props = {
	image: ImageType | undefined;
	size: 'thumbnail' | 'medium' | 'large' | 'og';
	alt: string;
	className?: string;
	quality?: number;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
};

export function CustomImage({
	image,
	alt,
	size,
	className,
	quality = 60,
	priority = false,
	loading = 'lazy',
}: Props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const src = image ? image.sizes?.[size]?.url || image.url! : '/og-image.webp';
	const blurDataURL = image
		? image.blurHash!
		: 'data:image/png;base64,WERy8KHe?ErexDer%3WVaxoLWBj[}cnlE0S4SdofM{ofogR*t7ay';

	const refined_alt = image ? image.caption || alt : alt;
	return (
		<Image
			className={cn(
				className,
				`h-full w-full object-cover duration-500 ease-in-out ${isLoaded ? 'blur-0' : 'blur-sm'}`
			)}
			priority={priority}
			width={
				image
					? image.sizes?.[size]?.width
						? image.sizes?.[size]?.width
						: image.width!
					: 300
			}
			height={
				image
					? image.sizes?.[size]?.height
						? image.sizes?.[size]?.height
						: image.height!
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
	);
}
