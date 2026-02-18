<script>
	import { base } from "$app/paths"
	import ButtonBar from "$lib/components/ButtonBar.svelte"

	let active_tab = 0

	const tabs = [
		{ href: `${base}/clockify-export/main`, name: "Clockify Data", order: 0 },
		{ href: `${base}/clockify-export/settings`, name: "Settings", order: 2 }
	]

	const sortedTabs = tabs.slice().sort((a, b) => a.order - b.order)

	const setActive = (index) => {
		active_tab = index
	}
</script>

<div class="d-flex justify-content-between align-items-center mb-4">
	<div>
		<h3>Clockify Export</h3>
	</div>
	<div>
		<ButtonBar />
	</div>
</div>

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
