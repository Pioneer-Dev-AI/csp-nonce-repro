import { execaCommand } from 'execa'

export async function setup() {
	await execaCommand(
		'npx prisma migrate reset --force --skip-seed --skip-generate',
		{
			stdio: 'inherit',
			env: {
				...process.env,
			},
		},
	)
}
