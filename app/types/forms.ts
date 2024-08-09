import { useController, useForm, Path } from 'react-hook-form'

export interface SelectOption {
	readonly label: string
	readonly value: string
}

export interface BaseField<T> {
	readonly name: Path<T>
	readonly label?: string
}

export interface EmailAddressField<T> extends BaseField<T> {
	readonly type: 'email'
	readonly defaultValue?: string
}

export interface PasswordField<T> extends BaseField<T> {
	readonly type: 'password'
	readonly defaultValue?: string
}

export interface SelectField<T> extends BaseField<T> {
	readonly type: 'select'
	readonly options: SelectOption[]
	readonly defaultValue?: string
}

export interface MultiSelectField<T> extends BaseField<T> {
	readonly type: 'multi-select'
	readonly options: SelectOption[]
	readonly defaultValue?: string[]
}

export interface AgeField<T> extends BaseField<T> {
	readonly type: 'age'
	readonly defaultValue?: number
}

export type FieldFromConfigType<T> =
	| EmailAddressField<T>
	| PasswordField<T>
	| SelectField<T>
	| MultiSelectField<T>
	| AgeField<T>

export type ListOfErrors = Array<
	ReturnType<typeof useController>['fieldState']['error']
>
