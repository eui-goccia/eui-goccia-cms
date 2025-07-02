import type {
	GridBlock,
	Image,
	ImageBlock,
	QuoteBlock,
	TextBlock,
} from '@payload-types';
import type {
	DefaultNodeTypes,
	DefaultTypedEditorState,
	SerializedBlockNode,
	SerializedLinkNode,
} from '@payloadcms/richtext-lexical';
import {
	RichText as ConvertRichText,
	convertLexicalNodesToJSX,
	type JSXConverter,
	type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';
import { cn } from '@/modules/utilities/cnUtils';
import { CustomImage } from '../components/CustomImage';

const isPopulatedDoc = (
	value: unknown
): value is { id: string; [key: string]: unknown } => {
	return typeof value === 'object' && value !== null && 'id' in value;
};

const isSluggableDoc = (
	value: unknown
): value is { slug: string; [key: string]: unknown } => {
	return (
		isPopulatedDoc(value) && 'slug' in value && typeof value.slug === 'string'
	);
};

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<QuoteBlock | ImageBlock | TextBlock | GridBlock>;

type LinkField = {
	linkType: 'custom' | 'internal' | string;
	newTab?: boolean;
	url?: string;
	doc?: {
		value?:
			| { id: string; [key: string]: unknown }
			| { slug: string; [key: string]: unknown };
		relationTo?: string;
	};
};

const CustomLinkConverter: JSXConverter<SerializedLinkNode> = ({
	node,
	converters,
	parent,
}) => {
	const fields = node.fields as LinkField;

	const renderedChildren = convertLexicalNodesToJSX({
		nodes: node.children,
		converters,
		parent,
	});

	if (
		fields.linkType === 'internal' &&
		'doc' in fields &&
		fields.doc?.value &&
		isSluggableDoc(fields.doc.value)
	) {
		return <Link href={`/${fields.doc.value.slug}`}>{renderedChildren}</Link>;
	}

	// Default external/custom link rendering or fallback
	const href = 'url' in fields && fields.url ? fields.url : '#';
	const newTabProps = fields.newTab
		? { target: '_blank', rel: 'noopener noreferrer' }
		: {};

	return (
		<Link href={href ?? '#'} {...newTabProps}>
			{renderedChildren}
		</Link>
	);
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => {
	const { blocks, inlineBlocks, ...restOfDefaultConverters } =
		defaultConverters;

	return {
		...blocks,
		...inlineBlocks,
		...restOfDefaultConverters,
		link: (props) => CustomLinkConverter({ ...props }),
		upload: ({ node }) => {
			const image = node.value as Image;
			return (
				<CustomImage
					className='aspect-16/10 rounded-2xl'
					image={image}
					size='large'
					alt={image.caption}
					showCaption={true}
				/>
			);
		},
		heading: ({ converters, node, parent }) => {
			const children = convertLexicalNodesToJSX({
				nodes: node.children,
				converters,
				parent,
			});
			switch (node.tag) {
				case 'h1':
					return (
						<h1
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-5xl text-4xl lg:text-6xl font-bold mb-6'
							)}
						>
							{children}
						</h1>
					);
				case 'h2':
					return (
						<h2
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-4xl text-3xl lg:text-5xl'
							)}
						>
							{children}
						</h2>
					);
				case 'h3':
					return (
						<h3
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-3xl text-2xl lg:text-4xl font-semibold mb-4'
							)}
						>
							{children}
						</h3>
					);
				case 'h4':
					return (
						<h4
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-2xl text-xl lg:text-3xl font-semibold mb-3'
							)}
						>
							{children}
						</h4>
					);
				case 'h5':
					return (
						<h5
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-xl text-lg lg:text-2xl font-semibold mb-2'
							)}
						>
							{children}
						</h5>
					);
				case 'h6':
					return (
						<h6
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-base text-sm lg:text-lg font-semibold mb-2'
							)}
						>
							{children}
						</h6>
					);
				default:
					return (
						<h3
							className={cn(
								'font-ghost varW600 uppercase scroll-mt-48 md:text-3xl text-2xl lg:text-4xl font-semibold mb-5'
							)}
						>
							{children}
						</h3>
					);
			}
		},
	};
};

type Props = {
	data: DefaultTypedEditorState;
	enableGutter?: boolean;
	enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
	const {
		className,
		enableProse = false,
		enableGutter = false,
		...rest
	} = props;
	return (
		<ConvertRichText
			converters={jsxConverters}
			className={cn(
				{
					container: enableGutter,
					'max-w-none': !enableGutter,
					'prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert':
						enableProse,
				},
				className,
				'flex flex-col gap-2.5 md:gap-5',
				'font-greed tracking-[0.01em] text-xl md:text-2xl'
			)}
			{...rest}
		/>
	);
}
