export interface Resource {
	id: string;
	slug: string;
	description: string;
	date: string;
	secondaryDescription: string;
	reference: string;
	href?: string;
	keywords: string[];
	fileType: string;
	year: string;
	body: string[];
	entity: string;
	highlights: string[];
	imagePlaceholder: boolean;
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

const BODY_PARAGRAPHS = [
	"Il presente documento illustra in dettaglio le attività condotte nell'ambito del progetto La Goccia, con particolare riferimento alle analisi territoriali e alle mappature delle risorse idriche locali. L'approccio metodologico adottato combina tecniche di rilevamento sul campo con l'elaborazione di dati geospaziali, al fine di costruire un quadro conoscitivo completo delle dinamiche idriche del territorio.",
	'I risultati ottenuti evidenziano una significativa variabilità nella distribuzione delle risorse idriche, con implicazioni rilevanti per la pianificazione sostenibile del territorio. Le raccomandazioni formulate nel documento mirano a orientare le future azioni progettuali verso un modello di gestione integrata delle risorse, in linea con gli obiettivi di sviluppo sostenibile.',
];

export const MOCK_RESOURCES: Resource[] = [
	{
		id: '1',
		slug: slugify('Analisi del territorio e mappatura risorse idriche'),
		description: 'Analisi del territorio e mappatura risorse idriche',
		date: '15.03.2025',
		secondaryDescription: 'Studio preliminare sulle fonti idriche locali',
		reference: 'WP1',
		keywords: ['ACQUA', 'TERRITORIO'],
		fileType: 'PDF',
		year: '2025',
		body: BODY_PARAGRAPHS,
		entity: 'COMUNE DI MILANO',
		highlights: ['MAPPATURA GIS', 'DATI IDRICI', 'ANALISI SUOLO'],
		imagePlaceholder: true,
	},
	{
		id: '2',
		slug: slugify('Report impatto ambientale fase iniziale'),
		description: 'Report impatto ambientale fase iniziale',
		date: '22.01.2025',
		secondaryDescription: 'Valutazione impatto progetto pilota',
		reference: 'WP2',
		keywords: ['AMBIENTE', 'SOSTENIBILITÀ'],
		fileType: 'PDF',
		year: '2025',
		body: BODY_PARAGRAPHS,
		entity: 'REGIONE LOMBARDIA',
		highlights: ['IMPATTO CO2', 'BIODIVERSITÀ', 'MITIGAZIONE'],
		imagePlaceholder: true,
	},
	{
		id: '3',
		slug: slugify('Documentazione tecnica impianto filtrazione'),
		description: 'Documentazione tecnica impianto filtrazione',
		date: '10.11.2024',
		secondaryDescription: 'Specifiche tecniche sistema di filtrazione',
		reference: 'WP1',
		keywords: ['TECNICA', 'ACQUA'],
		fileType: 'DOC',
		year: '2024',
		body: BODY_PARAGRAPHS,
		entity: 'POLITECNICO DI MILANO',
		highlights: ['FILTRAZIONE', 'CAPACITÀ', 'EFFICIENZA'],
		imagePlaceholder: true,
	},
	{
		id: '4',
		slug: slugify('Piano di monitoraggio qualità acqua'),
		description: 'Piano di monitoraggio qualità acqua',
		date: '05.09.2024',
		secondaryDescription: 'Protocollo monitoraggio parametri chimici',
		reference: 'WP3',
		keywords: ['ACQUA', 'MONITORAGGIO'],
		fileType: 'PDF',
		year: '2024',
		body: BODY_PARAGRAPHS,
		entity: 'ARPA LOMBARDIA',
		highlights: ['PH LIVELLI', 'METALLI', 'BATTERI'],
		imagePlaceholder: true,
	},
	{
		id: '5',
		slug: slugify('Presentazione risultati workshop comunitario'),
		description: 'Presentazione risultati workshop comunitario',
		date: '18.07.2024',
		secondaryDescription: 'Sintesi incontro con stakeholder locali',
		reference: 'WP4',
		keywords: ['COMUNITÀ', 'PARTECIPAZIONE'],
		fileType: 'PPT',
		year: '2024',
		body: BODY_PARAGRAPHS,
		entity: 'MUNICIPIO 9',
		highlights: ['PARTECIPANTI', 'PROPOSTE', 'CONSENSO'],
		imagePlaceholder: true,
	},
	{
		id: '6',
		slug: slugify('Linee guida gestione sostenibile risorse'),
		description: 'Linee guida gestione sostenibile risorse',
		date: '02.06.2024',
		secondaryDescription: 'Framework per gestione integrata',
		reference: 'WP2',
		keywords: ['SOSTENIBILITÀ', 'GESTIONE'],
		fileType: 'PDF',
		year: '2024',
		body: BODY_PARAGRAPHS,
		entity: 'COMUNE DI MILANO',
		highlights: ['FRAMEWORK', 'INDICATORI', 'TIMELINE'],
		imagePlaceholder: true,
	},
	{
		id: '7',
		slug: slugify('Rapporto annuale attività 2023'),
		description: 'Rapporto annuale attività 2023',
		date: '15.01.2024',
		secondaryDescription: 'Resoconto completo attività svolte',
		reference: 'WP1',
		keywords: ['REPORT', 'ATTIVITÀ'],
		fileType: 'PDF',
		year: '2024',
		body: BODY_PARAGRAPHS,
		entity: 'LA GOCCIA ETS',
		highlights: ['MILESTONE', 'BUDGET', 'RISULTATI'],
		imagePlaceholder: true,
	},
	{
		id: '8',
		slug: slugify('Studio biodiversità area progetto'),
		description: 'Studio biodiversità area progetto',
		date: '20.10.2023',
		secondaryDescription: 'Censimento flora e fauna locali',
		reference: 'WP3',
		keywords: ['AMBIENTE', 'BIODIVERSITÀ'],
		fileType: 'PDF',
		year: '2023',
		body: BODY_PARAGRAPHS,
		entity: 'UNIVERSITÀ DEGLI STUDI DI MILANO',
		highlights: ['SPECIE', 'HABITAT', 'CONSERVAZIONE'],
		imagePlaceholder: true,
	},
	{
		id: '9',
		slug: slugify('Materiale didattico educazione ambientale'),
		description: 'Materiale didattico educazione ambientale',
		date: '08.09.2023',
		secondaryDescription: 'Kit formativo per scuole del territorio',
		reference: 'WP4',
		keywords: ['EDUCAZIONE', 'COMUNITÀ'],
		fileType: 'DOC',
		year: '2023',
		body: BODY_PARAGRAPHS,
		entity: 'MIUR',
		highlights: ['MODULI', 'ETÀ TARGET', 'VALUTAZIONE'],
		imagePlaceholder: true,
	},
	{
		id: '10',
		slug: slugify('Analisi dati pluviometrici decennali'),
		description: 'Analisi dati pluviometrici decennali',
		date: '30.05.2023',
		secondaryDescription: 'Elaborazione dati meteorologici storici',
		reference: 'WP1',
		keywords: ['ACQUA', 'TERRITORIO'],
		fileType: 'XLS',
		year: '2023',
		body: BODY_PARAGRAPHS,
		entity: 'ARPA LOMBARDIA',
		highlights: ['PRECIPITAZIONI', 'TREND', 'PREVISIONI'],
		imagePlaceholder: true,
	},
	{
		id: '11',
		slug: slugify('Proposta progettuale iniziale'),
		description: 'Proposta progettuale iniziale',
		date: '12.03.2023',
		secondaryDescription: 'Documento fondativo del progetto La Goccia',
		reference: 'WP1',
		keywords: ['PROGETTO', 'GESTIONE'],
		fileType: 'PDF',
		year: '2023',
		body: BODY_PARAGRAPHS,
		entity: 'LA GOCCIA ETS',
		highlights: ['OBIETTIVI', 'PARTNER', 'BUDGET'],
		imagePlaceholder: true,
	},
	{
		id: '12',
		slug: slugify('Mappa interattiva punti di raccolta'),
		description: 'Mappa interattiva punti di raccolta',
		date: '01.02.2023',
		secondaryDescription: 'Geolocalizzazione infrastrutture idriche',
		reference: 'WP2',
		keywords: ['TERRITORIO', 'TECNICA'],
		fileType: 'PDF',
		year: '2023',
		body: BODY_PARAGRAPHS,
		entity: 'POLITECNICO DI MILANO',
		highlights: ['COORDINATE', 'INFRASTRUTTURE', 'RETE'],
		imagePlaceholder: true,
	},
];

export const FILTER_GROUPS = [
	{
		label: 'PAROLA CHIAVE',
		options: [
			'ACQUA',
			'TERRITORIO',
			'AMBIENTE',
			'SOSTENIBILITÀ',
			'COMUNITÀ',
			'TECNICA',
			'MONITORAGGIO',
			'PARTECIPAZIONE',
			'GESTIONE',
			'EDUCAZIONE',
			'BIODIVERSITÀ',
			'REPORT',
			'PROGETTO',
			'ATTIVITÀ',
		],
	},
	{
		label: 'TIPO DI DOCUMENTO',
		options: ['PDF', 'DOC', 'PPT', 'XLS'],
	},
	{
		label: 'ANNO',
		options: ['2025', '2024', '2023'],
	},
];

export function getResourceBySlug(slug: string): Resource | undefined {
	return MOCK_RESOURCES.find((r) => r.slug === slug);
}
