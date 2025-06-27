'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapGocciaOverview() {
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!mapContainerRef.current) return;
		mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			center: [9.15216, 45.50638],
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

		return () => {
			mapRef.current?.remove();
		};
	}, []);

	return (
		<div
			className='h-full w-full'
			id='map-container'
			ref={mapContainerRef}
		></div>
	);
}
