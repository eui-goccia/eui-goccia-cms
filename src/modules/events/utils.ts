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
			timeZone: 'Europe/Rome',
		}).format(date),
		time: new Intl.DateTimeFormat(loc, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Europe/Rome',
		}).format(date),
	};
}

export function formatEventDateRange(
	startDate: string,
	endDate: string | null | undefined,
	locale: string
): string {
	const loc = locale === 'it' ? 'it-IT' : 'en-GB';
	const dateFmt = new Intl.DateTimeFormat(loc, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'Europe/Rome',
	});
	const timeFmt = new Intl.DateTimeFormat(loc, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Europe/Rome',
	});

	const start = new Date(startDate);
	const startDateLabel = dateFmt.format(start);
	const startTimeLabel = timeFmt.format(start);

	if (!endDate) {
		return `${startDateLabel} ${startTimeLabel}`;
	}

	const end = new Date(endDate);
	const endDateLabel = dateFmt.format(end);
	const endTimeLabel = timeFmt.format(end);

	if (startDateLabel === endDateLabel) {
		return `${startDateLabel} ${startTimeLabel} – ${endTimeLabel}`;
	}
	return `${startDateLabel} ${startTimeLabel} – ${endDateLabel} ${endTimeLabel}`;
}

export function groupSubEventsByLabel(
	subEvents: (string | Event)[],
	{ includeDrafts = false }: { includeDrafts?: boolean } = {}
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
		if (!includeDrafts && item._status === 'draft') {
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
