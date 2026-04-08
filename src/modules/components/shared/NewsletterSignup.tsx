import { getTranslations } from 'next-intl/server';

export default async function NewsletterSignup() {
	const t = await getTranslations('newsletter');
	return (
		<div className='w-full bg-rosa-300 min-h-55 px-5 lg:px-10 flex flex-col lg:flex-row items-center justify-between pb-10 pt-16 gap-y-5 lg:gap-y-10 gap-x-5'>
			<div className='flex flex-col text-start'>
				<h1 className='font-tagada text-4xl md:text-5xl xl:text-6xl'>
					{t('title')}
				</h1>
				<p className='font-greed md:text-3xl text-2xl xl:text-4xl text-balance'>
					{t('description')}
				</p>
			</div>

			<div className='p-0'>
				<iframe
					className='w-full min-h-90'
					height={360}
					src={
						'https://gocciaeu.substack.com/embed?simple=true&utm_source=navbar&utm_medium=web&utm_campaign=navbar_click&background_color=64b217'
					}
					style={{
						mixBlendMode: 'multiply',
						padding: 0,
						margin: 0,
						width: '100%',
					}}
					title='Newsletter Signup'
				/>
			</div>
		</div>
	);
}
