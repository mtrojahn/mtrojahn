<script>
	import { base } from "$app/paths"

	let active_tab = 0

	const tabs = [
		{ href: `${base}/gaming-tasks-app/main`, name: "Tasks", order: 0 },
		{ href: `${base}/gaming-tasks-app/settings`, name: "Settings", order: 1 }
	]

	const sortedTabs = tabs.slice().sort((a, b) => a.order - b.order)

	const setActive = (index) => {
		active_tab = index
	}
</script>

<h3>
	My Gaming Task App <sup>(for annoying gaming tasks)</sup>
</h3>

<div class="card mt-4">
	<div class="card-header">
		<ul class="nav nav-tabs card-header-tabs">
			{#each sortedTabs as { href, name }, index (index)}
				<li class="nav-item">
					<a on:click={() => setActive(index)} class={index === active_tab ? "nav-link active" : "nav-link"} href={href}>
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
