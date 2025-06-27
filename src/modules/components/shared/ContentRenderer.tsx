import Image from 'next/image';
import type { BlogSection, ContentBlock } from '@/data/articles/types';
import BlockHeading from '@/modules/components/blocks/BlockHeading';
import BlockParagraph from '@/modules/components/blocks/BlockParagraph';
import BlockText from '@/modules/components/blocks/BlockText';

interface ContentRendererProps {
	sections: BlogSection[];
}

const renderBlock = (block: ContentBlock, index: number) => {
	switch (block.type) {
		case 'heading':
			return (
				<BlockHeading key={index} id={block.id}>
					{block.content}
				</BlockHeading>
			);
		case 'text':
			return (
				<BlockText customClass={block.customClass} key={index}>
					{block.content}
				</BlockText>
			);
		case 'image':
			return (
				<div key={index} className='flex flex-col gap-2.5'>
					<Image
						src={block.src!}
						width={100}
						height={100}
						sizes='(min-width: 768px) 70vw, 100vw'
						className={block.customClass || 'aspect-16/10 rounded-2xl'}
						alt={block.alt || ''}
						priority={block.priority || false}
					/>
					<p className='font-greed varW600 text-lg'>{block.caption}</p>
				</div>
			);
		default:
			return null;
	}
};

export default function ContentRenderer({ sections }: ContentRendererProps) {
	return (
		<>
			{sections.map((section, sectionIndex) => (
				<BlockParagraph key={sectionIndex} customClass={section.customClass}>
					{section.blocks.map((block, blockIndex) =>
						renderBlock(block, blockIndex)
					)}
				</BlockParagraph>
			))}
		</>
	);
}
