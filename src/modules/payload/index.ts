import config from '@payload-config';
import { getPayload } from 'payload';

interface GlobalPayload {
	payloadInstance?: Awaited<ReturnType<typeof getPayload>>;
	payloadPromise?: Promise<Awaited<ReturnType<typeof getPayload>>>;
}

const globalPayload = globalThis as GlobalPayload;

export async function getPayloadInstance(): Promise<
	Awaited<ReturnType<typeof getPayload>>
> {
	if (globalPayload.payloadInstance) {
		return globalPayload.payloadInstance;
	}
	if (globalPayload.payloadPromise) {
		return globalPayload.payloadPromise;
	}

	globalPayload.payloadPromise = (async () => {
		try {
			const instance = await getPayload({ config });
			globalPayload.payloadInstance = instance;
			return instance;
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				error.message.includes('Cannot overwrite')
			) {
				console.warn(
					'OverwriteModelError caught; returning existing instance if available.'
				);
				if (globalPayload.payloadInstance) {
					return globalPayload.payloadInstance;
				}
			}
			throw error;
		}
	})();

	return globalPayload.payloadPromise;
}
