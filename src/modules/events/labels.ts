export const SUB_EVENT_LABEL_ORDER = [
	'esplorazioni',
	'approfondimenti',
	'attivita-piccoli',
	'talk-musica-arte',
	'esposizioni-voci',
] as const;

export type SubEventLabel = (typeof SUB_EVENT_LABEL_ORDER)[number];
