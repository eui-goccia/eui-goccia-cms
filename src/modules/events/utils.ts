import type { Event } from '@payload-types';
import { SUB_EVENT_LABEL_ORDER } from './labels';

export function formatEventDateTime(
	dateString: string,
	locale: string
): { date: string; time: string } {
	const date = new Date(dateString);
	const loc = locale === 'it' ? 'it-IT' : 'en-GB';

	return {
		date: new Intl.DateTimeFormat(loc, {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(date),
		time: new Intl.DateTimeFormat(loc, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}).format(date),
	};
}

export function groupSubEventsByLabel(
	subEvents: (string | Event)[]
): Map<string, Event[]> {
	const groups = new Map<string, Event[]>();

	for (const label of SUB_EVENT_LABEL_ORDER) {
		groups.set(label, []);
	}

	const unlabeled: Event[] = [];

	for (const item of subEvents) {
		if (typeof item === 'string') {
			continue;
		}
		if (item._status === 'draft') {
			continue;
		}

		if (item.label) {
			const group = groups.get(item.label);
			if (group) {
				group.push(item);
			}
		} else {
			unlabeled.push(item);
		}
	}

	for (const [label, events] of groups) {
		if (events.length === 0) {
			groups.delete(label);
		}
	}

	if (unlabeled.length > 0) {
		groups.set('other', unlabeled);
	}

	return groups;
}
