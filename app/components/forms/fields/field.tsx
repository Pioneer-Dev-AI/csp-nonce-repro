import React from 'react'
import { useId } from 'react'
import { ListOfErrors } from '#app/types'
import { Label } from '../helpers/label'
import { ErrorList } from '../helpers/error-list'
import { Input } from './../inputs/input'
import { Email } from './../inputs/email'
import { Password } from './../inputs/password'
import { type FieldFromConfigType } from '#app/types'

type FieldProps<T> = FieldFromConfigType<T> &
	React.InputHTMLAttributes<HTMLInputElement> & {
		type: FieldFromConfigType<T>['type']
		labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
		inputRef?: React.Ref<HTMLInputElement>
		errors?: ListOfErrors
		className?: string
	}

function Field<T>({
	id,
	type,
	labelProps,
	errors,
	className,
	defaultValue,
	...rest
}: FieldProps<T>) {
	const fallbackId = useId()
	id = id ?? fallbackId
	const errorId = errors?.length ? `${id}-error` : undefined

	// Default value handling
	const getDefaultValue = () => {
		if (defaultValue !== undefined) {
			return defaultValue
		}
		switch (type) {
			case 'multi-select':
				return []
			default:
				return ''
		}
	}

	// Props for the input components
	const componentProps = {
		id,
		'aria-invalid': errorId ? true : undefined,
		'aria-describedby': errorId,
		defaultValue: getDefaultValue(),
		...rest,
	}

	// Render the correct input component based on the type
	const getInput = () => {
		switch (type) {
			case 'password':
				return <Password {...componentProps} />
			case 'email':
				return <Email {...componentProps} />
			default:
				return <Input type="text" {...componentProps} />
		}
	}

	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			{getInput()}
			<div className="min-h-[32px] px-4 pb-3 pt-1">
				{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
			</div>
		</div>
	)
}

export { Field }
