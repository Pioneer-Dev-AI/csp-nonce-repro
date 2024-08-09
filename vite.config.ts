import dns from 'node:dns'
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { glob } from 'glob'
import { flatRoutes } from 'remix-flat-routes'
import { defineConfig } from 'vite'

dns.setDefaultResultOrder('verbatim')

installGlobals({ nativeFetch: true })

const MODE = process.env.NODE_ENV

export default defineConfig({
	resolve: {
		alias: {
			'#app': '/app',
			'#shared': '/shared',
		},
	},
	build: {
		cssMinify: MODE === 'production',
		rollupOptions: {
			external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
		},
		assetsInlineLimit: (source) => {
			if (source.endsWith('sprite.svg')) {
				return false
			}
		},
		sourcemap: true,
	},
	server: {
		middlewareMode: true, // Enable middleware mode
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
	plugins: [
		remix({
			ignoredRouteFiles: ['**/*'],
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				unstable_singleFetch: true,
			},
			serverModuleFormat: 'esm',
			routes: async (defineRoutes) => {
				return flatRoutes('routes', defineRoutes, {
					ignoredRouteFiles: [
						'.*',
						'**/*.css',
						'**/*.test.{js,jsx,ts,tsx}',
						'**/__*.*',
						'**/*.server.*',
						'**/*.client.*',
					],
				})
			},
		}),
		process.env.SENTRY_AUTH_TOKEN
			? sentryVitePlugin({
					disable: MODE !== 'production',
					authToken: process.env.SENTRY_AUTH_TOKEN,
					org: process.env.SENTRY_ORG,
					project: process.env.SENTRY_PROJECT,
					release: {
						name: process.env.COMMIT_SHA,
						setCommits: {
							auto: true,
						},
					},
					sourcemaps: {
						filesToDeleteAfterUpload: await glob([
							'./build/**/*.map',
							'.server-build/**/*.map',
						]),
					},
				})
			: null,
	],
})
