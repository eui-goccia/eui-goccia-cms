import { revalidatePath } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobal: GlobalAfterChangeHook = ({
	global,
	req: { payload, context },
}) => {
	if (!context.disableRevalidate) {
		payload.logger.info(`Revalidating ${global.slug} page`);
		revalidatePath('/');
		revalidatePath(`/(frontend)/${global.slug}`, 'page');
	}
	return global;
};
