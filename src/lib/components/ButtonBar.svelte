<script>
	import { base } from "$app/paths"
	import { goto } from "$app/navigation"
	import { themeSettings } from "$lib/stores/ThemeStore.js"

	$: themeStore = themeSettings

	const toggleTheme = () => {
		themeStore.update((t) => {
			t.theme = t.theme === "light" ? "dark" : "light"
			return t
		})
	}

	const goHome = () => {
		goto(`${base}/`)
	}

	// Props for theme button
	export let themeButtonClass = "btn btn-secondary btn-sm"
	export let themeIconClass = "fa fa-adjust"
	export let themeLabel = "Toggle Theme"

	// Props for home button
	export let homeButtonClass = "btn btn-primary btn-sm"
	export let homeIconClass = "fa fa-home"
	export let homeLabel = "Home"
</script>

<div class="d-flex gap-2 flex-nowrap">
	<button class={homeButtonClass} on:click={goHome} title={homeLabel}>
		<i class={homeIconClass} aria-hidden="true"></i>
	</button>

	<button class={themeButtonClass} on:click={toggleTheme} title={themeLabel}>
		<i class={themeIconClass} aria-hidden="true"></i>
	</button>
</div>
