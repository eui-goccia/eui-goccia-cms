export const SUB_EVENT_LABEL_ORDER = [
	'esplorazioni',
	'approfondimenti',
	'attivita-piccoli',
	'esposizioni-voci',
	'talk-musica-arte',
] as const;

export type SubEventLabel = (typeof SUB_EVENT_LABEL_ORDER)[number];
