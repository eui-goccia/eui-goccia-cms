import { getTranslations } from 'next-intl/server';

export default async function NewsletterSignup() {
	const t = await getTranslations('newsletter');
	return (
		<div className='bg-black w-full'>
			<div className='w-full rounded-3xl bg-verde-300 px-5 lg:px-10 grid grid-cols-12 pb-10 pt-16 gap-y-5 lg:gap-y-10 gap-x-5'>
				<div className='flex flex-col text-center col-start-1 xl:col-start-2 col-span-full xl:col-span-10'>
					<h1 className='font-tagada text-4xl md:text-5xl xl:text-6xl'>
						{t('title')}
					</h1>
					<p className='font-greed md:text-3xl text-2xl xl:text-4xl text-balance'>
						{t('description')}
					</p>
				</div>

				<div className=' p-0 col-span-full'>
					<iframe
						height='100%'
						src={
							'https://gocciaeu.substack.com/embed?simple=true&utm_source=navbar&utm_medium=web&utm_campaign=navbar_click&background_color=64b217'
						}
						style={{
							mixBlendMode: 'multiply',
							padding: 0,
							margin: 0,
						}}
						title='Newsletter Signup'
						width='100%'
					/>
				</div>
			</div>
		</div>
	);
}
