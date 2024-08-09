import { useState } from 'react'
import { Input, InputProps } from './input.tsx'

interface PasswordProps extends InputProps {}

export function Password(inputProps: PasswordProps) {
	const [showPassword, setShowPassword] = useState(false)
	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div>
			<button type="button" onClick={toggleShowPassword}>
				{showPassword ? 'Hide' : 'Show'}
			</button>
			<Input
				{...inputProps}
				type={showPassword ? 'text' : 'password'}
				autoComplete="new-password"
			/>
		</div>
	)
}
