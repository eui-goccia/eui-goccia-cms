import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

type PrivacyPolicyProps = {
	params: Promise<{ locale: Locale }>;
};

export default async function PrivacyPolicy({ params }: PrivacyPolicyProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<main className='mb-auto bg-blu-300 '>
			<div className='max-w-prose mx-auto space-y-16 py-25 md:py-40 font-greed text-xl px-5'>
				<div className='space-y-4'>
					<h1 className='font-tagada text-5xl'>Informativa sulla Privacy</h1>
					<p>Ultimo aggiornamento: 29 maggio 2025</p>
					<p>
						La presente Informativa sulla Privacy descrive le Nostre politiche e
						procedure sulla raccolta, l'uso e la divulgazione delle Sue
						informazioni quando Lei utilizza il Servizio e La informa sui Suoi
						diritti alla privacy e su come la legge La protegge.
					</p>
					<p>
						Utilizziamo i Suoi Dati Personali per fornire e migliorare il
						Servizio. Utilizzando il Servizio, Lei acconsente alla raccolta e
						all'uso delle informazioni in conformità con la presente Informativa
						sulla Privacy. La presente Informativa sulla Privacy è stata creata
						con l'aiuto del{' '}
						<a
							href='https://www.freeprivacypolicy.com/free-privacy-policy-generator/'
							rel='noopener noreferrer'
							target='_blank'
						>
							Generatore di Informative sulla Privacy Gratuito
						</a>
						.
					</p>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>
						Interpretazione e Definizioni
					</h2>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>Interpretazione</h3>
						<p>
							Le parole la cui lettera iniziale è maiuscola hanno significati
							definiti alle seguenti condizioni. Le seguenti definizioni avranno
							lo stesso significato indipendentemente dal fatto che appaiano al
							singolare o al plurale.
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>Definizioni</h3>
						<p>Ai fini della presente Informativa sulla Privacy:</p>
						<ul>
							<li>
								<p>
									<strong>Account</strong> si intende un account unico creato
									per Lei per accedere al nostro Servizio o a parti del nostro
									Servizio.
								</p>
							</li>
							<li>
								<p>
									<strong>Affiliata</strong> si intende un'entità che controlla,
									è controllata da o è sotto controllo comune con una parte,
									dove per "controllo" si intende la proprietà del 50% o più
									delle azioni, partecipazioni o altri titoli aventi diritto di
									voto per l'elezione di amministratori o altra autorità di
									gestione.
								</p>
							</li>
							<li>
								<p>
									<strong>Società</strong> (indicata come "la Società", "Noi",
									"Ci" o "Nostro" nel presente Accordo) si riferisce a Comune di
									Milano, Piazza della Scala, 2, 20121 Milano Italia.
								</p>
							</li>
							<li>
								<p>
									<strong>Cookie</strong> sono piccoli file che vengono inseriti
									sul Suo computer, dispositivo mobile o qualsiasi altro
									dispositivo da un sito web, contenenti i dettagli della Sua
									cronologia di navigazione su quel sito web tra i suoi
									molteplici usi.
								</p>
							</li>
							<li>
								<p>
									<strong>Paese</strong> si riferisce a: Italia
								</p>
							</li>
							<li>
								<p>
									<strong>Dispositivo</strong> si intende qualsiasi dispositivo
									che può accedere al Servizio come un computer, un telefono
									cellulare o un tablet digitale.
								</p>
							</li>
							<li>
								<p>
									<strong>Dati Personali</strong> sono qualsiasi informazione
									che si riferisce a un individuo identificato o identificabile.
								</p>
							</li>
							<li>
								<p>
									<strong>Servizio</strong> si riferisce al Sito Web.
								</p>
							</li>
							<li>
								<p>
									<strong>Fornitore di Servizi</strong> si intende qualsiasi
									persona fisica o giuridica che elabora i dati per conto della
									Società. Si riferisce a società terze o individui impiegati
									dalla Società per facilitare il Servizio, per fornire il
									Servizio per conto della Società, per eseguire servizi
									relativi al Servizio o per assistere la Società nell'analisi
									di come viene utilizzato il Servizio.
								</p>
							</li>
							<li>
								<p>
									<strong>Dati di Utilizzo</strong> si riferiscono ai dati
									raccolti automaticamente, generati dall'uso del Servizio o
									dall'infrastruttura del Servizio stessa (ad esempio, la durata
									di una visita a una pagina).
								</p>
							</li>
							<li>
								<p>
									<strong>Sito Web</strong> si riferisce a EUI Goccia,
									accessibile da{' '}
									<a
										href='https://eui-goccia.eu'
										rel='external nofollow noopener'
										target='_blank'
									>
										https://eui-goccia.eu
									</a>
								</p>
							</li>
							<li>
								<p>
									<strong>Lei</strong> si intende l'individuo che accede o
									utilizza il Servizio, o la società, o altra entità legale per
									conto della quale tale individuo accede o utilizza il
									Servizio, a seconda dei casi.
								</p>
							</li>
						</ul>
					</div>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>
						Raccolta e Utilizzo dei Suoi Dati Personali
					</h2>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>Tipi di Dati Raccolti</h3>

						<div className='space-y-4'>
							<h4 className='font-tagada text-2xl'>Dati Personali</h4>
							<p>
								Durante l'utilizzo del Nostro Servizio, potremmo chiederLe di
								fornirci alcune informazioni di identificazione personale che
								possono essere utilizzate per contattarLa o identificarLa. Le
								informazioni di identificazione personale possono includere, ma
								non sono limitate a:
							</p>
							<ul>
								<li>
									<p>Indirizzo email</p>
								</li>
								<li>
									<p>Dati di Utilizzo</p>
								</li>
							</ul>
						</div>

						<div className='space-y-4'>
							<h4 className='font-tagada text-2xl'>Dati di Utilizzo</h4>
							<p>
								I Dati di Utilizzo vengono raccolti automaticamente durante
								l'utilizzo del Servizio.
							</p>
							<p>
								I Dati di Utilizzo possono includere informazioni come
								l'indirizzo del Protocollo Internet del Suo Dispositivo (ad es.
								indirizzo IP), tipo di browser, versione del browser, le pagine
								del nostro Servizio che Lei visita, l'ora e la data della Sua
								visita, il tempo trascorso su tali pagine, identificatori
								univoci del dispositivo e altri dati diagnostici.
							</p>
							<p>
								Quando Lei accede al Servizio da o tramite un dispositivo
								mobile, potremmo raccogliere automaticamente alcune
								informazioni, tra cui, ma non solo, il tipo di dispositivo
								mobile che Lei utilizza, l'ID univoco del Suo dispositivo
								mobile, l'indirizzo IP del Suo dispositivo mobile, il Suo
								sistema operativo mobile, il tipo di browser Internet mobile che
								Lei utilizza, identificatori univoci del dispositivo e altri
								dati diagnostici.
							</p>
							<p>
								Potremmo anche raccogliere informazioni che il Suo browser invia
								ogni volta che Lei visita il nostro Servizio o quando Lei accede
								al Servizio da o tramite un dispositivo mobile.
							</p>
						</div>

						<div>
							<h4 className='font-tagada text-2xl'>
								Tecnologie di Tracciamento e Cookie
							</h4>
							<p>
								Utilizziamo Cookie e tecnologie di tracciamento simili per
								tracciare l'attività sul Nostro Servizio e memorizzare
								determinate informazioni. Le tecnologie di tracciamento
								utilizzate sono beacon, tag e script per raccogliere e tracciare
								informazioni e per migliorare e analizzare il Nostro Servizio.
								Le tecnologie che utilizziamo possono includere:
							</p>
							<ul>
								<li>
									<strong>Cookie o Cookie del Browser.</strong> Un cookie è un
									piccolo file inserito sul Suo Dispositivo. Lei può istruire il
									Suo browser a rifiutare tutti i Cookie o a indicare quando un
									Cookie viene inviato. Tuttavia, se Lei non accetta i Cookie,
									potrebbe non essere in grado di utilizzare alcune parti del
									nostro Servizio. A meno che Lei non abbia regolato le
									impostazioni del Suo browser in modo che rifiuti i Cookie, il
									nostro Servizio potrebbe utilizzare i Cookie.
								</li>
								<li>
									<strong>Web Beacon.</strong> Alcune sezioni del nostro
									Servizio e le nostre email possono contenere piccoli file
									elettronici noti come web beacon (chiamati anche clear gif,
									pixel tag e single-pixel gif) che consentono alla Società, ad
									esempio, di contare gli utenti che hanno visitato tali pagine
									o aperto un'email e per altre statistiche relative al sito web
									(ad esempio, registrare la popolarità di una determinata
									sezione e verificare l'integrità del sistema e del server).
								</li>
							</ul>
							<p>
								I Cookie possono essere "Persistenti" o "di Sessione". I Cookie
								Persistenti rimangono sul Suo computer personale o dispositivo
								mobile quando Lei va offline, mentre i Cookie di Sessione
								vengono eliminati non appena Lei chiude il Suo browser web. Per
								saperne di più sui cookie, consulti l'articolo sul{' '}
								<a
									href='https://www.freeprivacypolicy.com/blog/sample-privacy-policy-template/#Use_Of_Cookies_And_Tracking'
									rel='noopener noreferrer'
									target='_blank'
								>
									sito web di Free Privacy Policy
								</a>
								.
							</p>
							<p>
								Utilizziamo sia Cookie di Sessione che Persistenti per gli scopi
								indicati di seguito:
							</p>
							<ul>
								<li>
									<p>
										<strong>Cookie Necessari / Essenziali</strong>
									</p>
									<p>Tipo: Cookie di Sessione</p>
									<p>Amministrati da: Noi</p>
									<p>
										Scopo: Questi Cookie sono essenziali per fornirLe i servizi
										disponibili attraverso il Sito Web e per consentirLe di
										utilizzare alcune delle sue funzionalità. Aiutano ad
										autenticare gli utenti e a prevenire l'uso fraudolento degli
										account utente. Senza questi Cookie, i servizi che Lei ha
										richiesto non possono essere forniti, e Noi utilizziamo
										questi Cookie solo per fornirLe tali servizi.
									</p>
								</li>
								<li>
									<p>
										<strong>
											Cookie di Accettazione Policy sui Cookie / Avviso
										</strong>
									</p>
									<p>Tipo: Cookie Persistenti</p>
									<p>Amministrati da: Noi</p>
									<p>
										Scopo: Questi Cookie identificano se gli utenti hanno
										accettato l'uso dei cookie sul Sito Web.
									</p>
								</li>
								<li>
									<p>
										<strong>Cookie di Funzionalità</strong>
									</p>
									<p>Tipo: Cookie Persistenti</p>
									<p>Amministrati da: Noi</p>
									<p>
										Scopo: Questi Cookie ci consentono di ricordare le scelte
										che Lei fa quando utilizza il Sito Web, come ricordare i
										Suoi dati di accesso o la preferenza della lingua. Lo scopo
										di questi Cookie è fornirLe un'esperienza più personale ed
										evitarLe di dover reinserire le Sue preferenze ogni volta
										che Lei utilizza il Sito Web.
									</p>
								</li>
							</ul>
							<p>
								Per ulteriori informazioni sui cookie che utilizziamo e sulle
								Sue scelte relative ai cookie, La preghiamo di visitare la
								nostra Informativa sui Cookie o la sezione Cookie della nostra
								Informativa sulla Privacy.
							</p>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Uso dei Suoi Dati Personali
						</h3>
						<p>
							La Società può utilizzare i Dati Personali per i seguenti scopi:
						</p>
						<ul>
							<li>
								<p>
									<strong>Per fornire e mantenere il nostro Servizio</strong>,
									incluso monitorare l'utilizzo del nostro Servizio.
								</p>
							</li>
							<li>
								<p>
									<strong>Per gestire il Suo Account:</strong> per gestire la
									Sua registrazione come utente del Servizio. I Dati Personali
									che Lei fornisce possono darLe accesso a diverse funzionalità
									del Servizio che sono disponibili per Lei come utente
									registrato.
								</p>
							</li>
							<li>
								<p>
									<strong>Per l'esecuzione di un contratto:</strong> lo
									sviluppo, la conformità e l'esecuzione del contratto di
									acquisto per i prodotti, articoli o servizi che Lei ha
									acquistato o di qualsiasi altro contratto con Noi attraverso
									il Servizio.
								</p>
							</li>
							<li>
								<p>
									<strong>Per contattarLa:</strong> Per contattarLa via email,
									chiamate telefoniche, SMS o altre forme equivalenti di
									comunicazione elettronica, come le notifiche push di
									un'applicazione mobile riguardanti aggiornamenti o
									comunicazioni informative relative alle funzionalità, prodotti
									o servizi contrattati, inclusi gli aggiornamenti di sicurezza,
									quando necessario o ragionevole per la loro implementazione.
								</p>
							</li>
							<li>
								<p>
									<strong>Per fornirLe</strong> notizie, offerte speciali e
									informazioni generali su altri beni, servizi ed eventi che
									offriamo simili a quelli che Lei ha già acquistato o
									richiesto, a meno che Lei non abbia scelto di non ricevere
									tali informazioni.
								</p>
							</li>
							<li>
								<p>
									<strong>Per gestire le Sue richieste:</strong> Per rispondere
									e gestire le Sue richieste a Noi.
								</p>
							</li>
							<li>
								<p>
									<strong>Per trasferimenti aziendali:</strong> Potremmo
									utilizzare le Sue informazioni per valutare o condurre una
									fusione, cessione, ristrutturazione, riorganizzazione,
									scioglimento o altra vendita o trasferimento di alcuni o tutti
									i Nostri beni, sia come azienda in attività che come parte di
									fallimento, liquidazione o procedura simile, in cui i Dati
									Personali da Noi detenuti sugli utenti del nostro Servizio
									sono tra i beni trasferiti.
								</p>
							</li>
							<li>
								<p>
									<strong>Per altri scopi</strong>: Potremmo utilizzare le Sue
									informazioni per altri scopi, come l'analisi dei dati,
									l'identificazione delle tendenze di utilizzo, la
									determinazione dell'efficacia delle nostre campagne
									promozionali e per valutare e migliorare il nostro Servizio,
									prodotti, servizi, marketing e la Sua esperienza.
								</p>
							</li>
						</ul>
						<p>
							Potremmo condividere le Sue informazioni personali nelle seguenti
							situazioni:
						</p>
						<ul>
							<li>
								<strong>Con i Fornitori di Servizi:</strong> Potremmo
								condividere le Sue informazioni personali con i Fornitori di
								Servizi per monitorare e analizzare l'uso del nostro Servizio,
								per contattarLa.
							</li>
							<li>
								<strong>Per trasferimenti aziendali:</strong> Potremmo
								condividere o trasferire le Sue informazioni personali in
								relazione a, o durante le negoziazioni di, qualsiasi fusione,
								vendita di beni della Società, finanziamento o acquisizione di
								tutta o una parte della Nostra attività a un'altra società.
							</li>
							<li>
								<strong>Con le Affiliate:</strong> Potremmo condividere le Sue
								informazioni con le Nostre affiliate, nel qual caso richiederemo
								a tali affiliate di onorare la presente Informativa sulla
								Privacy. Le affiliate includono la Nostra società madre e
								qualsiasi altra controllata, partner di joint venture o altre
								società che Noi controlliamo o che sono sotto controllo comune
								con Noi.
							</li>
							<li>
								<strong>Con partner commerciali:</strong> Potremmo condividere
								le Sue informazioni con i Nostri partner commerciali per
								offrirLe determinati prodotti, servizi o promozioni.
							</li>
							<li>
								<strong>Con altri utenti:</strong> quando Lei condivide
								informazioni personali o interagisce in altro modo nelle aree
								pubbliche con altri utenti, tali informazioni possono essere
								visualizzate da tutti gli utenti e possono essere distribuite
								pubblicamente all'esterno.
							</li>
							<li>
								<strong>Con il Suo consenso</strong>: Potremmo divulgare le Sue
								informazioni personali per qualsiasi altro scopo con il Suo
								consenso.
							</li>
						</ul>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Conservazione dei Suoi Dati Personali
						</h3>
						<p>
							La Società conserverà i Suoi Dati Personali solo per il tempo
							necessario agli scopi indicati nella presente Informativa sulla
							Privacy. Conserveremo e utilizzeremo i Suoi Dati Personali nella
							misura necessaria per adempiere ai nostri obblighi legali (ad
							esempio, se siamo tenuti a conservare i Suoi dati per rispettare
							le leggi applicabili), risolvere controversie e far rispettare i
							nostri accordi e politiche legali.
						</p>
						<p>
							La Società conserverà anche i Dati di Utilizzo per scopi di
							analisi interna. I Dati di Utilizzo sono generalmente conservati
							per un periodo di tempo più breve, tranne quando questi dati
							vengono utilizzati per rafforzare la sicurezza o per migliorare la
							funzionalità del Nostro Servizio, o siamo legalmente obbligati a
							conservare questi dati per periodi di tempo più lunghi.
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Trasferimento dei Suoi Dati Personali
						</h3>
						<p>
							Le Sue informazioni, inclusi i Dati Personali, vengono elaborate
							presso gli uffici operativi della Società e in qualsiasi altro
							luogo in cui si trovano le parti coinvolte nell'elaborazione. Ciò
							significa che queste informazioni possono essere trasferite a — e
							mantenute su — computer situati al di fuori del Suo stato,
							provincia, paese o altra giurisdizione governativa in cui le leggi
							sulla protezione dei dati possono differire da quelle della Sua
							giurisdizione.
						</p>
						<p>
							Il Suo consenso alla presente Informativa sulla Privacy seguito
							dalla Sua presentazione di tali informazioni rappresenta il Suo
							accordo a tale trasferimento.
						</p>
						<p>
							La Società adotterà tutte le misure ragionevolmente necessarie per
							garantire che i Suoi dati siano trattati in modo sicuro e in
							conformità con la presente Informativa sulla Privacy e nessun
							trasferimento dei Suoi Dati Personali avverrà verso
							un'organizzazione o un paese a meno che non vi siano controlli
							adeguati in atto, inclusa la sicurezza dei Suoi dati e altre
							informazioni personali.
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Eliminazione dei Suoi Dati Personali
						</h3>
						<p>
							Lei ha il diritto di eliminare o richiedere che Noi La assistiamo
							nell'eliminazione dei Dati Personali che abbiamo raccolto su di
							Lei.
						</p>
						<p>
							Il Nostro Servizio potrebbe darLe la possibilità di eliminare
							determinate informazioni su di Lei dall'interno del Servizio.
						</p>
						<p>
							Lei può aggiornare, modificare o eliminare le Sue informazioni in
							qualsiasi momento accedendo al Suo Account, se ne ha uno, e
							visitando la sezione delle impostazioni dell'account che Le
							consente di gestire le Sue informazioni personali. Lei può anche
							contattarci per richiedere l'accesso, la correzione o
							l'eliminazione di qualsiasi informazione personale che Lei ci ha
							fornito.
						</p>
						<p>
							Si prega di notare, tuttavia, che potremmo aver bisogno di
							conservare determinate informazioni quando abbiamo un obbligo
							legale o una base giuridica per farlo.
						</p>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Divulgazione dei Suoi Dati Personali
						</h3>

						<div className='space-y-4'>
							<h4 className='font-tagada text-2xl'>Forze dell'ordine</h4>
							<p>
								In determinate circostanze, alla Società potrebbe essere
								richiesto di divulgare i Suoi Dati Personali se richiesto dalla
								legge o in risposta a richieste valide da parte di autorità
								pubbliche (ad es. un tribunale o un'agenzia governativa).
							</p>
						</div>

						<div className='space-y-4'>
							<h4 className='font-tagada text-2xl'>Altri requisiti legali</h4>
							<p>
								La Società può divulgare i Suoi Dati Personali in buona fede
								ritenendo che tale azione sia necessaria per:
							</p>
							<ul>
								<li>Adempiere a un obbligo legale</li>
								<li>
									Proteggere e difendere i diritti o la proprietà della Società
								</li>
								<li>
									Prevenire o indagare su possibili illeciti in relazione al
									Servizio
								</li>
								<li>
									Proteggere la sicurezza personale degli Utenti del Servizio o
									del pubblico
								</li>
								<li>Proteggersi da responsabilità legale</li>
							</ul>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='font-tagada text-3xl'>
							Sicurezza dei Suoi Dati Personali
						</h3>
						<p>
							La sicurezza dei Suoi Dati Personali è importante per Noi, ma
							ricordi che nessun metodo di trasmissione su Internet o metodo di
							archiviazione elettronica è sicuro al 100%. Sebbene ci sforziamo
							di utilizzare mezzi commercialmente accettabili per proteggere i
							Suoi Dati Personali, non possiamo garantirne la sicurezza
							assoluta.
						</p>
					</div>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>Privacy dei Minori</h2>
					<p>
						Il Nostro Servizio non si rivolge a persone di età inferiore ai 13
						anni. Non raccogliamo consapevolmente informazioni di
						identificazione personale da persone di età inferiore ai 13 anni. Se
						Lei è un genitore o tutore ed è consapevole che Suo figlio ci ha
						fornito Dati Personali, La preghiamo di contattarci. Se veniamo a
						conoscenza del fatto che abbiamo raccolto Dati Personali da persone
						di età inferiore ai 13 anni senza verifica del consenso dei
						genitori, adottiamo misure per rimuovere tali informazioni dai
						Nostri server.
					</p>
					<p>
						Se dobbiamo fare affidamento sul consenso come base legale per
						l'elaborazione delle Sue informazioni e il Suo paese richiede il
						consenso di un genitore, potremmo richiedere il consenso del Suo
						genitore prima di raccogliere e utilizzare tali informazioni.
					</p>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>Link ad Altri Siti Web</h2>
					<p>
						Il Nostro Servizio può contenere link ad altri siti web che non sono
						gestiti da Noi. Se Lei clicca su un link di terze parti, sarà
						indirizzato al sito di tale terza parte. Le consigliamo vivamente di
						rivedere l'Informativa sulla Privacy di ogni sito che visita.
					</p>
					<p>
						Non abbiamo alcun controllo e non ci assumiamo alcuna responsabilità
						per il contenuto, le politiche sulla privacy o le pratiche di siti o
						servizi di terze parti.
					</p>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>
						Modifiche alla Presente Informativa sulla Privacy
					</h2>
					<p>
						Potremmo aggiornare la Nostra Informativa sulla Privacy di tanto in
						tanto. La informeremo di eventuali modifiche pubblicando la nuova
						Informativa sulla Privacy su questa pagina.
					</p>
					<p>
						La informeremo via email e/o con un avviso ben visibile sul Nostro
						Servizio, prima che la modifica diventi effettiva e aggiorneremo la
						data di "Ultimo aggiornamento" nella parte superiore della presente
						Informativa sulla Privacy.
					</p>
					<p>
						Si consiglia di rivedere periodicamente la presente Informativa
						sulla Privacy per eventuali modifiche. Le modifiche alla presente
						Informativa sulla Privacy sono efficaci quando vengono pubblicate su
						questa pagina.
					</p>
				</div>

				<div className='space-y-4'>
					<h2 className='font-tagada text-4xl'>Contattaci</h2>
					<p>
						In caso di domande sulla presente Informativa sulla Privacy, può
						contattarci:
					</p>
					<ul>
						<li>
							<p>Via email: mail@eui-goccia.eu</p>
						</li>
						<li>
							<p>
								Visitando questa pagina sul nostro sito web:{' '}
								<a
									href='https/eui-goccia.eu/privacy-policy'
									rel='external nofollow noopener'
									target='_blank'
								>
									https/eui-goccia.eu/privacy-policy
								</a>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
