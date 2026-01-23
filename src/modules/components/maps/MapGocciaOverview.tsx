'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapGocciaOverview() {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mapContainerRef.current) {
			return;
		}

		const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
		if (!token) {
			setError('Map configuration unavailable');
			return;
		}

		try {
			mapboxgl.accessToken = token;
			mapRef.current = new mapboxgl.Map({
				container: mapContainerRef.current,
				center: [9.152_16, 45.506_38],
				zoom: 15.56,
				style: 'mapbox://styles/mapbox/standard-satellite',
				config: {
					basemap: {
						lightPreset: 'day',
						showPedestrianRoads: false,
						showPlaceLabels: false,
						showPointOfInterestLabels: false,
						showRoadLabels: false,
						showTransitLabels: false,
						showLandmarkIcons: false,
						showLabels: false,
					},
				},
			});
			mapRef.current.scrollZoom.disable();

			mapRef.current.on('error', () => {
				setError('Failed to load map');
			});
		} catch {
			setError('Failed to initialize map');
		}

		return () => {
			mapRef.current?.remove();
		};
	}, []);

	if (error) {
		return (
			<div className='h-full w-full bg-gray-100 rounded-lg flex items-center justify-center'>
				<p className='text-gray-500'>{error}</p>
			</div>
		);
	}

	return (
		<div className='h-full w-full' id='map-container' ref={mapContainerRef} />
	);
}
