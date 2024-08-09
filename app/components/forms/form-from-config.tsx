import React, { useEffect } from 'react'
import { Form, useActionData } from '@remix-run/react'
import { useForm, type FieldValues, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ZodType } from 'zod'
import { Button } from '#app/components/ui/button'
import { useTranslation } from 'react-i18next'
import type {
	FieldFromConfigType,
	ClientFormError,
	ClientValidationError,
	TransationFunction,
} from '#app/types'
import { FieldFromConfig } from './fields/field-from-config'

interface Props<T extends FieldValues> extends React.ComponentProps<typeof Form> {
	fields: readonly FieldFromConfigType<T>[]
	createValidator?: (t: TransationFunction) => ZodType<T>
}

export function FormFromConfig<T extends FieldValues>({
	fields,
	createValidator,
	...formProps
}: Props<T>) {
	const { t } = useTranslation()
	const actionData = useActionData<T | ClientFormError>()

	const {
		control,
		setError,
		getValues,
		formState: { errors },
	} = useForm<T>({
		...(createValidator ? { resolver: zodResolver(createValidator(t)) } : {}),
		mode: 'onBlur',
	})

	console.log('errors', errors)

	useEffect(() => {
		// Handle validation errors from actionData
		if (
			(actionData as ClientValidationError)?.errorType === 'ValidationError'
		) {
			const { errorDetail } = actionData as ClientValidationError
			for (const [fieldName, fieldErrors] of Object.entries(errorDetail)) {
				if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
					setError(fieldName as Path<T>, { type: 'manual', message: fieldErrors[0] })
				}
			}
		}
	}, [actionData, setError])

	return (
		<Form {...formProps}>
			{fields.map((field) => {
				return (
					<FieldFromConfig
						key={field.name}
						name={field.name}
						control={control}
						label={field.label}
						// TODO: Fix this type issue
						type={field.type as any}
					/>
				)
			})}
			<Button type="submit">{t('Submit')}</Button>
		</Form>
	)
}
