import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';
import { globalBaseTag, globalTag, localesForInvalidation } from './cacheTags';

export const revalidateGlobal: GlobalAfterChangeHook = ({
	global,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return global;
	}

	payload.logger.info(`Revalidating ${global.slug} global`);

	revalidateTag(globalBaseTag(global.slug), {});

	for (const locale of localesForInvalidation) {
		revalidateTag(globalTag(global.slug, locale), {});
	}

	return global;
};
