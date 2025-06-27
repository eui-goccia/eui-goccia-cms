import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
	slug: 'about',
	label: 'Chi Siamo',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
			label: 'Descrizione',
			defaultValue:
				'La Cordata di progetto è guidata dal Comune di Milano e composta da Ambiente Italia Srl, Climateflux GmbH, Eutropian Association, FROM, Open Impact, Osservatorio La Goccia, Politecnico di Milano.',
		},
		{
			name: 'partners',
			type: 'array',
			label: 'Partner',
			fields: [
				{
					name: 'name',
					type: 'text',
					required: true,
					label: 'Nome',
				},
				{
					name: 'bio',
					type: 'textarea',
					required: true,
					label: 'Biografia',
				},
				{
					name: 'logo',
					type: 'upload',
					relationTo: 'images',
					label: 'Logo',
				},
				{
					name: 'members',
					type: 'textarea',
					label: 'Membri',
				},
			],
			defaultValue: [
				{
					name: 'Comune di Milano',
					bio: 'Il Comune di Milano è il leader del progetto, e si occupa di coordinare le attività di tutto il consorzio in qualità di Main Urban Authority. La Direzione Verde e Ambiente - Risorse Idriche e Igiene Ambientale è stata individuata come coordinatore delle attività, con il supporto diretto della Direzione di Progetto Resilienza Urbana, del Museo di Storia Naturale e della Ds Autorità Di Gestione e Monitoraggio Piani - Unità Fondi UE Diretti e con il coinvolgimento di tutte le direzioni del Comune che si occupano di questa area.',
				},
				{
					name: 'Ambiente Italia',
					bio: 'Ambiente Italia S.r.l. è tra le principali società di consulenza ambientale italiane, attiva da trent’anni anni in ambito sia nazionale che europeo, protagonista nel dibattito tecnico-scientifico e nella implementazione di strumenti e politica di tutela e gestione delle risorse ambientali e territoriali. In trent’anni di attività abbiamo sviluppato oltre 2000 progetti per aziende private e amministrazioni pubbliche.',
				},
				{
					name: 'Climate Flux',
					bio: "Climateflux è una societá di consulenza specializzata nella modellazione microclimatica combinando strumenti di simulazione ad alta risoluzione e tecniche di monitoraggio del clima fisico urbano e delle risposte individuali delle persone. Climateflux beneficia della sua esperienza nella modellazione integrata dei dati e nella combinazione di tecnologie di simulazione con quelle di rilevamento ambientale per stabilire il legame tra il fattore umano e l'ambiente costruito. I metodi digitali innovativi che impiega, anche attraverso lo sviluppo di applicazioni di intelligenza artificiale, servono acomprendere la dimensione microclimatica degli ambienti urbani e dimostrare il loro impatto sulla mitigazione dei cambiamenti climatici utilizzando un approccio multiscalare. Climateflux è partner di diversi di progetti di ricerca a livello internazionale.",
				},
				{
					name: 'Eutropian',
					bio: 'Eutropian è un’organizzazione no-profit che si occupa di ricerca, policy e azioni locali per supportare processi urbani inclusivi. Lavora a livello europeo per promuovere la rigenerazione urbana collaborativa, con un focus su spazi pubblici, economie locali, patrimonio culturale, housing collaborativo e governance partecipativa. Attraverso progetti e attività di advocacy, collega realtà locali con istituzioni, finanziatori e centri di ricerca per sviluppare modelli di trasformazione sostenibile e replicabile.',
				},
				{
					name: 'FROM',
					bio: 'FROM è una società specializzata in ricerca, progettazione sociale e comunicazione per la trasformazione urbana. Lavoriamo con amministrazioni pubbliche, enti territoriali, operatori immobiliari, associazioni di categoria, aziende private e istituzioni culturali che vogliono moltiplicare il valore pubblico che le loro iniziative e investimenti generano.',
				},
				{
					name: 'Open Impact',
					bio: 'Open Impact è una PMI innovativa e spin-off di ricerca accreditato dell’Università degli Studi di Milano-Bicocca, che offre servizi di consulenza e strumenti digitali per la misurazione, valorizzazione e gestione dell’impatto.  La mission di Open Impact consiste nell’integrare ricerca e tecnologia per attribuire valore alla sostenibilità sociale e ambientale, applicando ad essa metriche economiche e finanziarie che la rendano chiara e comprensibile a tutti.',
				},
				{
					name: 'Osservatorio La Goccia',
					bio: 'Osservatorio La Goccia è un partenariato interdisciplinare nato a Settembre 2022, con lo scopo di studiare e applicare soluzioni innovative nella rigenerazione dell’area della Goccia a Milano. L’obiettivo primario è quello del recupero e valorizzazione della foresta spontanea nata sui suoli contaminati della Goccia, tutelando la biodiversità e potenziandone i benefici ecosistemici. Dal 2024 OG è un’ATS (associazione temporanea di scopo) che conta 11 soggetti ed è uno dei partner principali del progetto europeo EUI.',
					members:
						'Terrapreta, Istituto di Ricerca sugli Ecosistemi Terrestri - Consiglio Nazionale delle Ricerche, Centro di Forestazione Urbana - Italia Nostra, Progetto Natura Onlus, M3R - Monitoring and Management of Microbial Resources, UniMi Bicocca - Dipartimento di Scienze dell’Ambiente e della Terra, UniMi Statale - Dipartimento di Scienze Agrarie e Ambientali, Iridra, Kilowatt, cheFare, Futurecologies',
				},
				{
					name: 'Politecnico di Milano',
					bio: 'Il Politecnico di Milano è una delle principali università tecniche d’Europa, rinomata per l’eccellenza nei campi dell’architettura, del design e dell’ingegneria. Fondato nel 1863, è il più grande ateneo tecnico in Italia e vanta una forte reputazione internazionale per la qualità dell’insegnamento e della ricerca all’avanguardia. Ha un forte orientamento alla collaborazione interdisciplinare e mantiene stretti legami con il mondo industriale, promuovendo una cultura dell’innovazione e della conoscenza applicata.',
				},
			],
		},
	],
};
