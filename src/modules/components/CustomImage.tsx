'use client';

import type { Image as ImageType } from '@payload-types';
import { useMemo, useState } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface Props {
	image: ImageType | undefined;
	size: 'thumbnail' | 'medium' | 'large' | 'og' | 'xlarge';
	alt?: string;
	className?: string;
	captionClassName?: string;
	priority?: boolean;
	loading?: 'lazy' | 'eager';
	showCaption?: boolean;
	sizes?: string;
}

type VariantName =
	NonNullable<ImageType['sizes']> extends infer Sizes
		? Sizes extends object
			? keyof Sizes
			: never
		: never;

type VariantData = NonNullable<NonNullable<ImageType['sizes']>[VariantName]>;

interface ResponsiveCandidate {
	url: string;
	width: number;
	height: number;
}

const WHITESPACE_REGEX = /\s+/;
const MAX_WIDTH_CLASS_REGEX = /(^|\s)max-w-/;
const MAX_HEIGHT_CLASS_REGEX = /(^|\s)max-h-/;
const FILL_SIZING_CLASS_REGEX = /(^|\s)(w-full|h-full|aspect-[^\s]+)/;

// Valid base64 placeholder - 1x1 transparent PNG
const DEFAULT_BLUR_PLACEHOLDER =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4nGNgAAIAAAUAAXpeqz8AAAAASUVORK5CYII=';

const SIZE_CANDIDATES: Record<Props['size'], VariantName[]> = {
	thumbnail: ['thumbnail'],
	medium: ['thumbnail', 'medium'],
	large: ['thumbnail', 'medium', 'large'],
	xlarge: ['thumbnail', 'medium', 'large', 'xlarge'],
	og: ['og'],
};

const DEFAULT_SIZES: Record<Props['size'], string> = {
	thumbnail: '(max-width: 767px) 50vw, 300px',
	medium: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
	large: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 50vw',
	xlarge: '100vw',
	og: '1200px',
};

const VARIANT_WIDTH_FALLBACKS: Record<VariantName, number> = {
	thumbnail: 300,
	medium: 900,
	large: 1400,
	xlarge: 1920,
	og: 1200,
};

function isVariantData(
	value: VariantData | null | undefined
): value is VariantData {
	return Boolean(value?.url);
}

function getResolvedCandidates(
	image: ImageType | undefined,
	size: Props['size']
): ResponsiveCandidate[] {
	const candidates = SIZE_CANDIDATES[size];
	const variants = image?.sizes;
	const largestExisting = [...candidates]
		.reverse()
		.find((candidate) => isVariantData(variants?.[candidate]));

	const resolved = candidates
		.map((candidate) => {
			const variant = variants?.[candidate];
			const fallbackVariant = largestExisting
				? variants?.[largestExisting]
				: undefined;
			let chosenVariant: VariantData | null = null;

			if (isVariantData(variant)) {
				chosenVariant = variant;
			} else if (isVariantData(fallbackVariant)) {
				chosenVariant = fallbackVariant;
			}

			if (!chosenVariant?.url) {
				return null;
			}

			return {
				url: chosenVariant.url,
				width:
					chosenVariant.width ??
					VARIANT_WIDTH_FALLBACKS[candidate] ??
					image?.width ??
					300,
				height: chosenVariant.height ?? image?.height ?? 300,
			};
		})
		.filter(
			(candidate): candidate is ResponsiveCandidate => candidate !== null
		);

	const deduped = Array.from(
		new Map(
			resolved.map((candidate) => [
				`${candidate.url}-${candidate.width}`,
				candidate,
			])
		).values()
	).sort((left, right) => left.width - right.width);

	if (deduped.length > 0) {
		return deduped;
	}

	if (!image?.url) {
		return [];
	}

	return [
		{
			url: image.url,
			width: image.width ?? 300,
			height: image.height ?? 300,
		},
	];
}

function getObjectClasses(className?: string): string {
	if (!className) {
		return 'object-cover object-center';
	}

	const objectClasses = className
		.split(WHITESPACE_REGEX)
		.filter((token) => token.startsWith('object-'))
		.join(' ');

	return objectClasses || 'object-cover object-center';
}

function usesIntrinsicSizing(className?: string): boolean {
	if (!className) {
		return false;
	}

	return (
		(MAX_WIDTH_CLASS_REGEX.test(className) ||
			MAX_HEIGHT_CLASS_REGEX.test(className)) &&
		!FILL_SIZING_CLASS_REGEX.test(className)
	);
}

export function CustomImage({
	image,
	alt,
	size,
	className,
	priority = false,
	loading = 'lazy',
	showCaption = false,
	captionClassName,
	sizes,
}: Props) {
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
	const responsiveCandidates = useMemo(
		() => getResolvedCandidates(image, size),
		[image, size]
	);
	const defaultCandidate =
		responsiveCandidates.at(-1) ??
		({
			url: '/og-image.webp',
			width: image?.width ?? 300,
			height: image?.height ?? 300,
		} satisfies ResponsiveCandidate);
	const blurDataURL = image?.blurHash ?? DEFAULT_BLUR_PLACEHOLDER;
	const refinedAlt =
		(image?.alt?.length ? image.alt : image?.caption) ?? alt ?? '';
	const srcSet =
		responsiveCandidates.length > 0
			? responsiveCandidates
					.map((candidate) => `${candidate.url} ${candidate.width}w`)
					.join(', ')
			: undefined;
	const wrapperUsesIntrinsicSizing = usesIntrinsicSizing(className);
	const objectClassName = getObjectClasses(className);
	const fetchPriority = priority ? 'high' : undefined;
	const imageLoading = priority ? 'eager' : loading;
	const loaded = loadedSrc === defaultCandidate.url;

	return (
		<>
			<div
				className={cn(
					'relative',
					wrapperUsesIntrinsicSizing
						? 'inline-block max-w-full'
						: 'block h-full w-full overflow-hidden',
					className
				)}
			>
				{blurDataURL ? (
					<>
						{/* biome-ignore lint/performance/noImgElement: This component intentionally bypasses next/image to preserve Payload route delivery. */}
						<img
							alt=''
							aria-hidden='true'
							className={cn(
								'pointer-events-none absolute inset-0 h-full w-full scale-105 blur-xl transition-opacity duration-500 ease-in-out',
								objectClassName,
								loaded ? 'opacity-0' : 'opacity-100'
							)}
							decoding='async'
							height={defaultCandidate.height}
							loading='eager'
							src={blurDataURL}
							width={defaultCandidate.width}
						/>
					</>
				) : null}
				{/* biome-ignore lint/performance/noImgElement: This component intentionally bypasses next/image to preserve Payload route delivery. */}
				{/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Native image load events drive the blur-up transition for this non-interactive media element. */}
				<img
					alt={refinedAlt}
					className={cn(
						'block transition-opacity duration-500 ease-in-out',
						wrapperUsesIntrinsicSizing
							? 'h-auto w-auto max-h-full max-w-full'
							: 'h-full w-full',
						objectClassName,
						loaded ? 'opacity-100' : 'opacity-0'
					)}
					decoding='async'
					fetchPriority={fetchPriority}
					height={defaultCandidate.height}
					loading={imageLoading}
					onError={() => {}}
					onLoad={() => setLoadedSrc(defaultCandidate.url)}
					sizes={sizes ?? DEFAULT_SIZES[size]}
					src={defaultCandidate.url}
					srcSet={srcSet}
					width={defaultCandidate.width}
				/>
			</div>
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
