<script>
	import { base } from "$app/paths"

	let myBase = `${base}/clockify-export`
	let active_tab = 0

	const tabs = [
		{ href: `${myBase}/main`, name: "Clockify Data", order: 0 },
		{ href: `${myBase}/settings`, name: "Settings", order: 2 }
	]

	const sortedTabs = tabs.slice().sort((a, b) => a.order - b.order)

	const setActive = (index) => {
		active_tab = index
	}
</script>

<h3>
	Clockify Export <sup>(when you still use spreadsheets in 2026+)</sup>
</h3>

<div class="card mt-4">
	<div class="card-header">
		<ul class="nav nav-tabs card-header-tabs">
			{#each sortedTabs as { href, name }, index (index)}
				<li class="nav-item">
					<a on:click={() => setActive(index)} class={index === active_tab ? "nav-link active" : "nav-link"} {href}>
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="card-body">
		<slot />
	</div>
</div>
