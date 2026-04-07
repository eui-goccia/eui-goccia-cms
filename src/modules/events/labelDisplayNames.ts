const LABEL_DISPLAY_NAMES: Record<string, Record<string, string>> = {
	esplorazioni: { it: 'Esplorazioni', en: 'Explorations' },
	approfondimenti: { it: 'Approfondimenti', en: 'Deep dives' },
	'attivita-piccoli': {
		it: 'Attività per i più piccoli',
		en: 'Activities for children',
	},
	'talk-musica-arte': {
		it: 'Talk, musica e arte',
		en: 'Talks, music and art',
	},
	'esposizioni-voci': {
		it: 'Esposizioni e voci dal quartiere',
		en: 'Exhibitions and voices from the neighbourhood',
	},
	other: { it: 'Altri eventi', en: 'Other events' },
};

export function getLabelDisplayName(label: string, locale: string): string {
	return LABEL_DISPLAY_NAMES[label]?.[locale] ?? label;
}
