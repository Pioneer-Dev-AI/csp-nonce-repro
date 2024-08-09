import { default as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	// add custom config objects here:
	{
		parserOptions: {
			EXPERIMENTAL_useProjectService: {
				maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: Infinity,
			},
		},
	},
]
