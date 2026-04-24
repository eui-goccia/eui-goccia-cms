import type { About } from '@payload-types';
import type { OptionObject, PayloadRequest } from 'payload';
import type { Locales } from '@/i18n/routing';
import { getGlobal } from '@/modules/utilities/getGlobals';

type AboutPartner = NonNullable<About['partners']>[number];

export function getValidPartners(
	about: About | null | undefined
): AboutPartner[] {
	return (about?.partners ?? []).filter((partner): partner is AboutPartner =>
		Boolean(
			partner?.id && typeof partner.name === 'string' && partner.name.trim()
		)
	);
}

export async function getPartnerOptions(
	locale?: Locales
): Promise<OptionObject[]> {
	const about = (await getGlobal('about', 0, locale)) as About;

	return getValidPartners(about).map((partner) => ({
		label: partner.name,
		value: partner.id ?? '',
	}));
}

export function resolvePartnerName(
	about: About | null | undefined,
	partnerId?: string | null
): string | null {
	if (!partnerId) {
		return null;
	}

	const match = getValidPartners(about).find(
		(partner) => partner.id === partnerId
	);

	return match?.name ?? null;
}

export async function validatePartnerId(
	partnerId: string | null | undefined,
	req: PayloadRequest
): Promise<true | string> {
	if (!partnerId) {
		return 'Partner is required.';
	}

	const about = (await req.payload.findGlobal({
		slug: 'about',
		depth: 0,
		locale: (req.locale ?? 'it') as Locales,
		req,
	})) as About;

	const isValid = getValidPartners(about).some(
		(partner) => partner.id === partnerId
	);

	return isValid ? true : 'Selected partner is no longer available.';
}
