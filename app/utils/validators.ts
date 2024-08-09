import { z } from 'zod'
import { type TransationFunction } from '#app/types'

export const createEmailValidator = (t: TransationFunction) => {
	return z
		.string({ message: t('Email is required') })
		.email({ message: t('Invalid email address') })
}

export const createPasswordValidator = (t: TransationFunction) => {
	return z
		.string({ message: t('Password is required') })
		.min(6, {
			message: t('Password must be at least 6 characters'),
		})
}

export const createSelectValidator = (t: TransationFunction) => {
	return z.string({ message: t('Select an option') })
}

export const createMultiSelectValidator = (t: TransationFunction) => {
	return z
		.array(z.string())
		.min(1, { message: t('Select at least one option') })
}

export const createAgeValidator = (t: TransationFunction) => {
	return z
		.number()
		.min(18, { message: t('Age must be at least 18') })
		.max(120, { message: t('Age must be at most 120') })
}