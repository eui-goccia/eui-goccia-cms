import { notFound } from 'next/navigation';
import { ResourceDetail } from '@/modules/components/risorse/ResourceDetail';
import {
	getResourceBySlug,
	MOCK_RESOURCES,
} from '@/modules/components/risorse/resourceData';

export function generateStaticParams() {
	return MOCK_RESOURCES.map((r) => ({ slug: r.slug }));
}

export default async function ResourcePage({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>;
}) {
	const { slug } = await params;
	const resource = getResourceBySlug(slug);

	if (!resource) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-blu-300'>
			<ResourceDetail resource={resource} />
			<div className='h-[185px] bg-rosso-300' />
		</div>
	);
}
