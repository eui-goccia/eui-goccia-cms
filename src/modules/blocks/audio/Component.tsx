import type { Audio, AudioBlock } from '@payload-types';
import { cn } from '@/modules/utilities/cnUtils';

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

export const AudioBlockComponent: React.FC<{
	blockData: AudioBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { sourceType, url, audioFile, title, caption, width, horizontal } =
		blockData;

	const widthValue = width ?? 'full';
	const horizontalValue = horizontal ?? 'center';

	const audioData = audioFile as Audio | null | undefined;
	const audioUrl = sourceType === 'upload' ? audioData?.url : url;

	if (!audioUrl) {
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
			{title ? <h3 className='mb-2 text-lg font-medium'>{title}</h3> : null}
			{/* biome-ignore lint/a11y/useMediaCaption: Audio files may not have caption tracks available */}
			<audio
				aria-label={title ?? 'Audio player'}
				className='w-full'
				controls
				preload='metadata'
				src={audioUrl}
			>
				Your browser does not support the audio element.
			</audio>
			{caption ? (
				<figcaption className='mt-2 text-sm text-gray-600'>
					{caption}
				</figcaption>
			) : null}
		</figure>
	);
};
