'use client';

import { useEffect, useRef, useState } from 'react';

export default function MapGocciaOverview() {
	// biome-ignore lint/suspicious/noExplicitAny: mapbox-gl types loaded dynamically
	const mapRef = useRef<any>(null);
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

		import('mapbox-gl').then((mapboxgl) => {
			if (!mapContainerRef.current) return;

			// Load CSS dynamically
			if (!document.querySelector('link[href*="mapbox-gl"]')) {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.4/mapbox-gl.css';
				document.head.appendChild(link);
			}

			mapboxgl.default.accessToken = token;
			const map = new mapboxgl.default.Map({
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
			map.scrollZoom.disable();
			mapRef.current = map;

			map.on('error', () => {
				setError('Failed to load map');
			});
		}).catch(() => {
			setError('Failed to initialize map');
		});

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
