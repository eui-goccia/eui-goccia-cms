import { Link } from '@/i18n/routing';
import MarqueeLogo from '@/modules/components/MarqueeLogo';

/* TODO add grid like the other pages */
export default function SectionIntroText() {
	return (
		<article className='bg-blue-200 text-2xl md:text-3xl lg:text-4xl items-center flex flex-col lg:gap-20 md:gap-16 gap-12 xl:gap-28 font-greed lg:py-12 md:py-10 py-8 xl:py-16'>
			<p className='w-full max-w-6xl  px-5 md:px-10'>
				Un’area urbana contaminata, chiusa da più di 30 anni, dove la natura ha
				trovato il suo spazio dando vita a una foresta urbana spontanea. Un
				luogo che, pur essendo stato abbandonato, ha trovato il suo modo di
				rinascere, trasformandosi in un polmone verde che ora si riapre alla
				città, rigenerando il suolo e restituendo bellezza e vita alla comunità.
			</p>
			<MarqueeLogo />
			<p className='w-full max-w-6xl px-5 md:px-10'>
				ll progetto GOCCIA, a partire dal processo di risanamento del suolo già
				avviato dall’ecosistema naturale, attiverà un sistema di interventi
				mirati a completare la bonifica del terreno.
			</p>
			<p className='w-full max-w-6xl px-5 md:px-10'>
				Grazie all’impiego di Nature Based Solutions e un modello di governance
				innovativo, sarà restituito uno spazio verde alla città, creando un
				laboratorio vivente dove la natura non solo rigenera il suolo, ma
				diventa anche protagonista della rigenerazione urbana.
			</p>
			<div className='w-full max-w-6xl pb-24 md:pb-32'>
				<Link
					className='w-fit  hover:no-underline decoration-1 underline underline-offset-4 max-w-6xl px-5 md:px-10'
					href='/progetto'
				>
					SCOPRI IL PROGETTO →
				</Link>
			</div>
		</article>
	);
}
