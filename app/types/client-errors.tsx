import { ErrorDetail } from '#shared/utils/types'

export interface ClientValidationError {
	errorType: 'ValidationError'
	errorDetail: ErrorDetail
}

export interface ClientInternalServerError {
	errorType: 'InternalServerError'
}

export type ClientFormError = ClientValidationError | ClientInternalServerError
