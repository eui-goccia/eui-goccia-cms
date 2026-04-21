'use client';

import { FieldError, FieldLabel, SelectInput, useField } from '@payloadcms/ui';
import type { OptionObject, TextFieldClientProps } from 'payload';
import type React from 'react';

type PartnerSelectFieldProps = TextFieldClientProps & {
	options: OptionObject[];
};

export const PartnerSelectField: React.FC<PartnerSelectFieldProps> = ({
	field,
	options,
	path: pathFromProps,
	readOnly,
}) => {
	const path = pathFromProps || field.name;
	const { label, required } = field;
	const { setValue, showError, value } = useField<string | null>({ path });

	const handleChange = (selectedOption: unknown) => {
		if (!selectedOption || Array.isArray(selectedOption)) {
			setValue(null);
			return;
		}

		if (
			typeof selectedOption === 'object' &&
			selectedOption !== null &&
			'value' in selectedOption &&
			typeof selectedOption.value === 'string'
		) {
			setValue(selectedOption.value);
			return;
		}

		setValue(null);
	};

	return (
		<div className='field-type'>
			<FieldLabel label={label} path={path} required={required} />
			<SelectInput
				isClearable={false}
				name={field.name}
				onChange={handleChange}
				options={options}
				path={path}
				readOnly={readOnly}
				showError={showError}
				value={value ?? undefined}
			/>
			<FieldError path={path} showError={showError} />
		</div>
	);
};
