'use client';

import {
	Button,
	FieldLabel,
	TextInput,
	useField,
	useForm,
	useFormFields,
	useLocale,
} from '@payloadcms/ui';
import type { TextFieldClientProps } from 'payload';
import type React from 'react';
import { useEffect } from 'react';

import { DEFAULT_SLUG_LOCALE, formatSlug } from './formatSlug';
import './index.scss';

type SlugComponentProps = {
	fieldToUse: string;
	checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent: React.FC<SlugComponentProps> = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
	path,
	readOnly: readOnlyFromProps,
}) => {
	const { label } = field;
	const locale = useLocale();
	const isCanonicalLocale = locale.code === DEFAULT_SLUG_LOCALE;

	const checkboxFieldPath = path?.includes('.')
		? `${path}.${checkboxFieldPathFromProps}`
		: checkboxFieldPathFromProps;

	const { value, setValue } = useField<string>({ path: path || field.name });

	const { dispatchFields } = useForm();

	// The value of the checkbox
	// We're using separate useFormFields to minimise re-renders
	const checkboxValue = useFormFields(
		([fields]) => fields[checkboxFieldPath]?.value as string
	);

	// The value of the field we're listening to for the slug
	const targetFieldValue = useFormFields(
		([fields]) => fields[fieldToUse]?.value as string
	);

	useEffect(() => {
		if (checkboxValue && isCanonicalLocale) {
			if (targetFieldValue) {
				const formattedSlug = formatSlug(targetFieldValue);

				if (value !== formattedSlug) {
					setValue(formattedSlug);
				}
			} else if (value !== '') {
				setValue('');
			}
		}
	}, [targetFieldValue, checkboxValue, isCanonicalLocale, setValue, value]);

	const handleLock = (e: React.MouseEvent<Element, MouseEvent>) => {
		e.preventDefault();

		if (!isCanonicalLocale) {
			return;
		}

		dispatchFields({
			type: 'UPDATE',
			path: checkboxFieldPath,
			value: !checkboxValue,
		});
	};

	const readOnly = readOnlyFromProps || checkboxValue || !isCanonicalLocale;

	return (
		<div className='field-type slug-field-component'>
			<div className='label-wrapper'>
				<FieldLabel htmlFor={`field-${path}`} label={label} />

				{isCanonicalLocale ? (
					<Button
						buttonStyle='none'
						className='lock-button'
						onClick={handleLock}
					>
						{checkboxValue ? 'Unlock' : 'Lock'}
					</Button>
				) : null}
			</div>

			<TextInput
				onChange={setValue}
				path={path || field.name}
				readOnly={Boolean(readOnly)}
				value={value}
			/>
		</div>
	);
};
