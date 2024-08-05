import process from 'node:process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import fastifyCaching from '@fastify/caching'
import compress from '@fastify/compress'
import helmet from '@fastify/helmet'
import fastifyStatic from '@fastify/static'
import { remixFastify } from '@mcansh/remix-fastify'
import { installGlobals } from '@remix-run/node'
import { fastify } from 'fastify'
import { apiRouter } from './apiRoutes'

installGlobals()

const app = fastify()

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

await app.register(fastifyCaching, {
	privacy: 'private',
	expiresIn: 3600, // Cache for 1 hour
})

await app.register(
	helmet,
	// enable csp nonces generation with default content-security-policy option
	{ enableCSPNonces: true },
)

await app.register(compress, {
	global: true, // Enable compression globally
})

// hack to disable fastify-static for playwright tests
if (process.env.DISABLE_FASTIFY_CACHE !== 'true') {
	await app.register(fastifyStatic, {
		root: join(__dirname, 'public'), // Serve static files from the 'public' directory
		prefix: '/public/', // Access files via /public/<file>
	})
}

// Ensure no fastifyStatic registration in the apiRouter
await app.register(apiRouter, { prefix: '/api' })
await app.register(remixFastify)

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST === 'true' ? '0.0.0.0' : '127.0.0.1'

let address = await app.listen({ port, host })
console.log(`✅ app ready: ${address}`)
