import { type ErrorDetail } from './types'

export class RaisedError extends Error {
	statusCode: number
	constructor(message: string, name: string, statusCode: number) {
		super(message)
		this.name = name
		this.statusCode = statusCode
	}
}

export class BadRequestError extends RaisedError {
	constructor(message: string) {
		super(message, 'BadRequestError', 400)
	}
}

export class ValidationError extends BadRequestError {
	errorDetail: ErrorDetail

	constructor(errorDetail: ErrorDetail) {
		super('ValidationError')
		this.name = 'ValidationError'
		this.errorDetail = errorDetail
	}
}
