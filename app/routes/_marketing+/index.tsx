import { type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => [{ title: 'Hello Page' }]

export default function Index() {
	return (
		<main className="font-poppins grid h-full place-items-center">
			<h1>Hello</h1>
			<Link to="/auth/register" className="text-blue-500 underline">
				Register
			</Link>
		</main>
	)
}
