import { type ActionFunction, json } from '@remix-run/node'

import { RaisedError, ValidationError } from '#shared/utils/errors.server.ts'

export function handleAction<T extends ActionFunction>(
	handler: T,
): ActionFunction {
	return async ({ request, params, context }) => {
		try {
			return await handler({ request, params, context })
		} catch (error) {
			// TODO: simplify
			if (error instanceof RaisedError) {
				if (error instanceof ValidationError) {
					return json(
						{
							error: error.message,
							errorType: error.name,
							errorDetail: error.errorDetail,
						},
						{ status: error.statusCode },
					)
				}
				return json(
					{
						error: error.message,
						errorType: error.name,
					},
					{ status: error.statusCode },
				)
			}
			console.error(error)
			return json(
				{
					error: 'Internal Server Error',
					errorType: 'InternalServerError',
				},
				{ status: 500 },
			)
		}
	}
}
