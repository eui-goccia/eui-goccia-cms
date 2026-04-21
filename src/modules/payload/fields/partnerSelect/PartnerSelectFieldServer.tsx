import type { TextFieldServerComponent } from 'payload';
import type { Locales } from '@/i18n/routing';
import { getPartnerOptions } from '@/modules/resources/partners';
import { PartnerSelectField } from './PartnerSelectField';

export const PartnerSelectFieldServer: TextFieldServerComponent = async ({
	clientField,
	path,
	readOnly,
	req,
}) => {
	const options = await getPartnerOptions((req?.locale ?? 'it') as Locales);

	return (
		<PartnerSelectField
			field={clientField}
			options={options}
			path={path}
			readOnly={readOnly}
		/>
	);
};
