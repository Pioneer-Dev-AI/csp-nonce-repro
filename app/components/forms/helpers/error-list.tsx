import { ListOfErrors } from '#app/types'

function ErrorList({ id, errors }: { errors?: ListOfErrors; id?: string }) {
	// error types are complicated and if they aren't strings then don't render anything
	const errorsToRender =
		errors
			?.filter((e) => e?.message)
			.map((e) => e?.message)
			.filter((e) => typeof e === 'string') || []

	if (!errorsToRender?.length) return null
	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map((e, index) => (
				<li key={index} className="text-[10px] text-foreground-destructive">
					{e}
				</li>
			))}
		</ul>
	)
}

export { ErrorList }
