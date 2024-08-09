import { useController, Control, FieldValues, Path } from 'react-hook-form'
import { type FieldFromConfigType } from '#app/types'
import { Field } from './field'

type FieldProps<T extends FieldValues> = FieldFromConfigType<T> & {
	control: Control<T>
}

export function FieldFromConfig<T extends FieldValues>({
	name,
	label,
	control,
	...rest
}: FieldProps<T>) {
	const {
		field: {ref, ...field},
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	return (
		<Field
			labelProps={{ children: label }}
			errors={error ? [error] : []}
			inputRef={ref}
			{...field}
			{...rest}
		/>
	)
}
