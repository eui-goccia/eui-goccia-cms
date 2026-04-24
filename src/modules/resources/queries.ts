import 'server-only';

import type { About, Image, Resource, Tag } from '@payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { PaginatedDocs, Where } from 'payload';
import type { Locales } from '@/i18n/routing';
import { getDocument, getDocuments } from '@/modules/utilities/getDocument';
import { getGlobal } from '@/modules/utilities/getGlobals';
import { getWorkPackageLabel, WORK_PACKAGE_OPTIONS } from './config';
import { getValidPartners, resolvePartnerName } from './partners';

export interface ResourceSearchFilters {
	partner: string[];
	preview?: string;
	q?: string;
	tag: string[];
	wp: string[];
	year: string[];
}

export interface ResourceTagOption {
	label: string;
	slug: string;
}

export interface ResolvedResourceTag {
	id: string;
	name: string;
	slug: string;
}

export interface ResolvedResourceDocumentUpdate {
	ctaLabel: string | null;
	date: string | null;
	dateLabel: string | null;
	description: string | null;
	id: string;
	title: string;
	url: string | null;
}

export interface ResolvedResource {
	dataPoints: string[];
	date: string | null;
	dateLabel: string | null;
	description: DefaultTypedEditorState | null;
	descriptionExcerpt: string;
	documentUpdates: ResolvedResourceDocumentUpdate[];
	gallery: Image[];
	id: string;
	partnerId: string | null;
	partnerName: string | null;
	slug: string;
	tags: ResolvedResourceTag[];
	title: string;
	workPackage: string | null;
	workPackageLabel: string | null;
	year: string | null;
}

export interface ResourceFilterOptions {
	partners: { label: string; value: string }[];
	tags: ResourceTagOption[];
	workPackages: typeof WORK_PACKAGE_OPTIONS;
	years: string[];
}

export interface ResourceListingData {
	filterOptions: ResourceFilterOptions;
	filters: ResourceSearchFilters;
	previewResource: ResolvedResource | null;
	resources: ResolvedResource[];
}

function getStringArray(value: string | string[] | undefined): string[] {
	if (!value) {
		return [];
	}

	const values = Array.isArray(value) ? value : [value];

	return Array.from(
		new Set(
			values
				.flatMap((entry) => entry.split(','))
				.map((entry) => entry.trim())
				.filter(Boolean)
		)
	);
}

export function normalizeResourceSearchParams(searchParams: {
	[key: string]: string | string[] | undefined;
}): ResourceSearchFilters {
	const q =
		typeof searchParams.q === 'string' ? searchParams.q.trim() : undefined;
	const preview =
		typeof searchParams.preview === 'string'
			? searchParams.preview.trim()
			: undefined;

	return {
		q: q || undefined,
		preview: preview || undefined,
		tag: getStringArray(searchParams.tag),
		wp: getStringArray(searchParams.wp),
		partner: getStringArray(searchParams.partner),
		year: getStringArray(searchParams.year),
	};
}

function formatResourceDate(
	date: string | null | undefined,
	locale: Locales
): string | null {
	if (!date) {
		return null;
	}

	const formatter = new Intl.DateTimeFormat(
		locale === 'en' ? 'en-GB' : 'it-IT',
		{
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}
	);

	return formatter.format(new Date(date)).replace(/\//g, '-');
}

function extractYear(date: string | null | undefined): string | null {
	if (!date) {
		return null;
	}

	return date.slice(0, 4);
}

function isTagDocument(value: string | Tag | null | undefined): value is Tag {
	return typeof value === 'object' && value !== null && 'name' in value;
}

function hasSlug<T extends { slug?: string | null }>(
	value: T
): value is T & { slug: string } {
	return typeof value.slug === 'string' && value.slug.length > 0;
}

function isImageDocument(
	value: string | Image | null | undefined
): value is Image {
	return typeof value === 'object' && value !== null && 'url' in value;
}

function extractNodeText(node: unknown): string[] {
	if (!node || typeof node !== 'object') {
		return [];
	}

	const record = node as {
		children?: unknown[];
		text?: string;
		type?: string;
	};
	const text = typeof record.text === 'string' ? [record.text] : [];
	const childText = Array.isArray(record.children)
		? record.children.flatMap((child) => extractNodeText(child))
		: [];

	return [...text, ...childText];
}

function extractRichTextExcerpt(
	state: DefaultTypedEditorState | null | undefined,
	maxLength = 220
): string {
	const rootChildren =
		state && typeof state === 'object' && 'root' in state
			? ((state.root as { children?: unknown[] }).children ?? [])
			: [];
	const text = rootChildren
		.flatMap((child) => extractNodeText(child))
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim();

	if (!text) {
		return '';
	}

	return text.length > maxLength
		? `${text.slice(0, maxLength).trimEnd()}...`
		: text;
}

function filterByYear(resources: Resource[], years: string[]): Resource[] {
	if (years.length === 0) {
		return resources;
	}

	return resources.filter((resource) => {
		const year = extractYear(resource.date);
		return year ? years.includes(year) : false;
	});
}

function resolveResource(
	resource: Resource,
	about: About,
	locale: Locales
): ResolvedResource {
	const tags = (resource.tags ?? [])
		.filter(isTagDocument)
		.filter(hasSlug)
		.map((tag) => ({
			id: tag.id,
			name: tag.name,
			slug: tag.slug,
		}));
	const gallery = (resource.gallery ?? []).filter(isImageDocument);
	const dataPoints = (resource.dataPoints ?? [])
		.map((item) => item?.value?.trim())
		.filter((value): value is string => Boolean(value));

	return {
		id: resource.id,
		slug: resource.slug ?? resource.id,
		title: resource.title,
		date: resource.date ?? null,
		dateLabel: formatResourceDate(resource.date, locale),
		year: extractYear(resource.date),
		workPackage: resource.workPackage ?? null,
		workPackageLabel: getWorkPackageLabel(resource.workPackage),
		partnerId: resource.partnerId ?? null,
		partnerName: resolvePartnerName(about, resource.partnerId),
		tags,
		description: resource.description ?? null,
		descriptionExcerpt: extractRichTextExcerpt(resource.description),
		dataPoints,
		gallery,
		documentUpdates: (resource.documentUpdates ?? []).map((update) => ({
			id: update.id ?? `${resource.id}-${update.date ?? 'update'}`,
			title: update.title,
			description: update.description ?? null,
			url: update.url ?? null,
			ctaLabel: update.ctaLabel ?? null,
			date: update.date ?? null,
			dateLabel: formatResourceDate(update.date, locale),
		})),
	};
}

function buildFilterOptions(
	resources: ResolvedResource[],
	about: About
): ResourceFilterOptions {
	const tags = Array.from(
		new Map(
			resources.flatMap((resource) =>
				resource.tags.map((tag) => [
					tag.slug,
					{ label: tag.name, slug: tag.slug },
				])
			)
		).values()
	).sort((left, right) => left.label.localeCompare(right.label));
	const years = Array.from(
		new Set(resources.map((resource) => resource.year).filter(Boolean))
	).sort((left, right) => Number(right) - Number(left)) as string[];
	const partners = getValidPartners(about)
		.map((partner) => ({
			label: partner.name,
			value: partner.id ?? '',
		}))
		.sort((left, right) => left.label.localeCompare(right.label));

	return {
		tags,
		years,
		partners,
		workPackages: WORK_PACKAGE_OPTIONS,
	};
}

async function getTagIdsBySlugs(
	slugs: string[],
	locale: Locales
): Promise<string[]> {
	if (slugs.length === 0) {
		return [];
	}

	const result = (await getDocuments({
		collection: 'tags',
		depth: 0,
		limit: 100,
		locale,
		sort: 'name',
		where: {
			slug: {
				in: slugs,
			},
		},
	})) as PaginatedDocs<Tag>;

	return result.docs.map((tag) => tag.id);
}

export async function getResourceListingData({
	draft = false,
	filters,
	locale,
}: {
	draft?: boolean;
	filters: ResourceSearchFilters;
	locale: Locales;
}): Promise<ResourceListingData> {
	const tagIds = await getTagIdsBySlugs(filters.tag, locale);
	const andConditions: Where[] = [];
	const hasUnmatchedTagFilter = filters.tag.length > 0 && tagIds.length === 0;

	if (filters.q) {
		andConditions.push({
			title: {
				like: filters.q,
			},
		});
	}

	if (filters.wp.length > 0) {
		andConditions.push({
			workPackage: {
				in: filters.wp,
			},
		});
	}

	if (filters.partner.length > 0) {
		andConditions.push({
			partnerId: {
				in: filters.partner,
			},
		});
	}

	if (tagIds.length > 0) {
		andConditions.push({
			tags: {
				in: tagIds,
			},
		});
	}

	const where: Where | undefined =
		andConditions.length > 0 ? { and: andConditions } : undefined;
	const [about, filteredResult, allResult, previewDocument] = await Promise.all(
		[
			getGlobal('about', 1, locale) as Promise<About>,
			hasUnmatchedTagFilter
				? Promise.resolve({
						docs: [] as Resource[],
					} as PaginatedDocs<Resource>)
				: (getDocuments({
						collection: 'resources',
						depth: 1,
						draft,
						limit: 100,
						locale,
						sort: '-date',
						where,
					}) as Promise<PaginatedDocs<Resource>>),
			getDocuments({
				collection: 'resources',
				depth: 1,
				draft,
				limit: 100,
				locale,
				sort: '-date',
			}) as Promise<PaginatedDocs<Resource>>,
			filters.preview
				? getDocument({
						collection: 'resources',
						slug: filters.preview,
						depth: 1,
						draft,
						locale,
					})
				: Promise.resolve(undefined),
		]
	);
	const filteredResources = filterByYear(filteredResult.docs, filters.year)
		.filter(hasSlug)
		.map((resource) => resolveResource(resource, about, locale));
	const allResources = allResult.docs
		.filter(hasSlug)
		.map((resource) => resolveResource(resource, about, locale));

	return {
		filters,
		resources: filteredResources,
		previewResource: previewDocument
			? resolveResource(previewDocument as Resource, about, locale)
			: null,
		filterOptions: buildFilterOptions(allResources, about),
	};
}

export async function getResolvedResourceBySlug({
	draft = false,
	locale,
	slug,
}: {
	draft?: boolean;
	locale: Locales;
	slug: string;
}): Promise<ResolvedResource | null> {
	const [about, resource] = await Promise.all([
		getGlobal('about', 1, locale) as Promise<About>,
		getDocument({
			collection: 'resources',
			slug,
			depth: 1,
			draft,
			locale,
		}) as Promise<Resource | undefined>,
	]);

	if (!resource) {
		return null;
	}

	return resolveResource(resource as Resource, about, locale);
}
