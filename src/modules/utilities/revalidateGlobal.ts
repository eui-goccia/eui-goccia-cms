import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateGlobal: GlobalAfterChangeHook = ({
	global,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return global;
	}

	payload.logger.info(`Revalidating ${global.slug} global`);

	// Single tag revalidation - simpler and more efficient
	revalidateTag(`global_${global.slug}`, {});

	return global;
};
