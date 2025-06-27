export const unslugify = (
	slug: string,
	settings: { capitalize?: boolean; separator?: string; split?: string } = {}
) => {
	const { capitalize = true, separator = ' ', split = '_' } = settings;
	return slug
		.split(split)
		.map((word) =>
			capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word
		)
		.join(separator);
};
