import { revalidatePath, updateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobal: GlobalAfterChangeHook = ({
	global,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating ${global.slug} global`);

		// Use updateTag for more efficient invalidation
		updateTag(`global_${global.slug}`);
		updateTag('global-content');

		// Keep revalidatePath for homepage and specific pages that need it
		revalidatePath('/');
		if (global.slug !== 'home') {
			revalidatePath(`/(frontend)/[locale]/${global.slug}`, 'page');
		}
	}
	return global;
};
