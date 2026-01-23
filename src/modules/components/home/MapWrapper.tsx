'use client';

import dynamic from 'next/dynamic';

const MapGocciaOverview = dynamic(
	() => import('@/modules/components/maps/MapGocciaOverview'),
	{
		ssr: false,
		loading: () => (
			<div className='h-[75dvh] w-full bg-gray-100 animate-pulse rounded-lg' />
		),
	}
);

export default function MapWrapper() {
	return <MapGocciaOverview />;
}
