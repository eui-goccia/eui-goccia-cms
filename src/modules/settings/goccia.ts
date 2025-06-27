import type { GlobalConfig } from 'payload';

export const Goccia: GlobalConfig = {
	slug: 'goccia',
	label: 'La Goccia',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
			label: 'Descrizione',
			defaultValue:
				'Nata come area industriale tra fine Ottocento e inizio Novecento, poi dismessa e abbandonata tra gli anni ‘70 e ‘90, la Goccia è oggi è al centro di progetti di rigenerazione che intrecciano memoria industriale, ambiente e futuro urbano.',
		},
		{
			name: 'timeline',
			type: 'array',
			label: 'Timeline',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titolo',
				},
				{
					name: 'description',
					type: 'textarea',
					required: true,
					label: 'Descrizione',
				},
				{
					name: 'cover',
					type: 'upload',
					relationTo: 'images',
					required: true,
					label: 'Immagine di copertina',
				},
				{
					name: 'start',
					type: 'number',
					required: true,
					label: 'Inizio Periodo',
					admin: {
						description: "Inserire l'anno di inizio del periodo. IE: `2020`",
					},
				},
				{
					name: 'end',
					type: 'number',
					label: 'Fine Periodo',
					admin: {
						description: "Inserire l'anno di fine del periodo. IE: `2025`",
					},
				},
			],
			defaultValue: [
				{
					title: 'Nascono le Officine del Gas',
					description:
						'Con la crescente domanda di energia, l’Union des Gaz avvia la costruzione delle Grandi Officine del Gas, in un’area di 30 ettari a nord del nucleo storico di Cascina Bovisa, dedicate alla produzione di energia tramite la gassificazione del carbone.',
					start: 1905,
				},
				{
					start: 1960,
					end: 1970,
					title: 'La dismissione degli impianti storici.',
					description:
						'Con l’arrivo progressivo del metano, l’attività delle Officine inizia a diminuire. All’inizio degli anni ’70, sotto la gestione Montedison, vengono demoliti alcuni grandi impianti per la lavorazione del carbone situati nella parte centrale del sito.',
				},
				{
					start: 1981,
					title: 'Le Officine diventano patrimonio pubblico.',
					description:
						'Nel 1981 viene municipalizzato il servizio gas e l’Azienda Energetica Municipale (AEM), diviene proprietaria dell’area delle Officine.',
				},
				{
					start: 1994,
					title: 'Chiusura degli impianti',
					description:
						' L’11 luglio 1994 gli impianti vengono definitivamente chiusi. Il sito viene dichiarato Sito di Interesse Nazionale (SIN) per le elevate concentrazioni di contaminanti nel suolo.',
				},
				{
					start: 1994,
					end: 2012,
					title: 'La nascita e la crescita della foresta spontanea',
					description:
						'Nel sito inizia a svilupparsi una foresta spontanea che avvia un processo spontaneo di bonifica del suolo. Negli anni l’area viene riconosciuta come bosco della Goccia e nasce un Comitato per la sua preservazione.',
				},
				{
					start: 2022,
					end: 2024,
					title: 'Un patto per il futuro della Goccia',
					description:
						"Ad Agosto 2022 viene firmato il patto di collaborazione 'Osservatorio La Goccia', con l’obiettivo di studiare l’ecosistema esistente e valutare possibili modalità di bonifica naturale e forme di fruizione pubblica compatibili e sostenibili. Nello stesso anno viene approvato il masterplan firmato dallo studio 'Renzo Piano Building Worshop' e promosso dal Politecnico di Milano per l'ampliamento del campus universitario nella parte sud dell’area della Goccia e il mantenimento del bosco. Nei due anni seguenti, vengono avviate le analisi integrative per la bonifica e la progettazione dell'intero comparto della Goccia.",
				},
				{
					start: 2024,
					title: 'L’inizio del progetto GOCCIA',
					description:
						'Prende il via GOCCIA, progetto europeo finanziato dalla European Urban Initiative (EUI), per l’attuazione e il consolidamento di un modello innovativo di biorisanamento e apertura progressiva della foresta spontanea su 18 ettari di proprietà comunale.',
				},
			],
		},
	],
};
