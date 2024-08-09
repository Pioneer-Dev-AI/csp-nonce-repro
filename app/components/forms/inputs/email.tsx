import { Input, InputProps } from './input.tsx'

interface EmailProps extends InputProps {}

export function Email(inputProps: EmailProps) {
	return (
		<Input
			{...inputProps}
			type="email"
			autoComplete="email"
		/>
	)
}
