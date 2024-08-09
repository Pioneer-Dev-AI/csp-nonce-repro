import { FormFromConfig } from '#app/components/forms/form-from-config'
import { t } from '#app/utils/api.server'
import { z } from 'zod'
import { createEmailValidator, createPasswordValidator } from '#app/utils/validators'
import { handleAction } from '#app/utils/remix-helpers.server'
import { ValidationError } from '#shared/utils/errors.server'
import { signupWithEmail } from '#app/utils/auth.server'
import type { TransationFunction } from '#app/types'

const createSignupValidator = (t: TransationFunction) => {
	return z
		.object({
			email: createEmailValidator(t),
			password: createPasswordValidator(t),
			verifyPassword: createPasswordValidator(t),
		})
		.refine((data) => data.password === data.verifyPassword, {
			message: t('Passwords do not match'),
			path: ['verifyPassword'],
		})
}


// TODO: add form abstraction
export const action = handleAction(async ({ request }) => {
	const formData = await request.formData()
	const formDataObj = Object.fromEntries(formData.entries())

	const result = createSignupValidator(t).safeParse(formDataObj)

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		throw new ValidationError(errors)
	}

	await signupWithEmail(result.data)
})

export default function RegisterRoute() {
	const fields = [
		{
			name: 'email',
			type: 'email',
			label: 'Email Address',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Password',
		},
		{
			name: 'verifyPassword',
			type: 'password',
			label: 'Verify Password',
		},
	] as const;

	return (
		<div className="form-container m-5">
			<FormFromConfig
				method="POST"
				action="/auth/register"
				fields={fields}
				createValidator={createSignupValidator}
			/>
		</div>
	)
}
