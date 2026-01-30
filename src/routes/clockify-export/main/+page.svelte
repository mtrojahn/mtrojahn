<script>
	import * as luxon from "luxon"
	import { onMount } from "svelte"
	import { loadTimeEntries, loadProjects, mappings } from "$lib/stores/ClockifyExportStore.js"

	let query_date = luxon.DateTime.now().toISODate()
	let entries = []
	let loading = false
	let projects = []

	// Parse PT5H30M format to readable string
	function formatDuration(durationString) {
		if (!durationString) return "0 min"

		const duration = luxon.Duration.fromISO(durationString)
		const hours = Math.floor(duration.as("hours"))
		const minutes = Math.floor(duration.as("minutes") % 60)

		if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
		if (hours > 0) return `${hours}h`
		return `${minutes}m`
	}

	function getProjectName(projectId) {
		const project = projects.find((p) => p.id === projectId)
		return project ? project.name : ""
	}

	async function handleDateChange() {
		if (!query_date) return

		loading = true
		// Load both in parallel
		const [entriesData, projectsData] = await Promise.all([loadTimeEntries(query_date), loadProjects()])
		entries = entriesData
		projects = projectsData
		loading = false
	}

	function getMappingForProject(projectName) {
		const all_mappings = $mappings
		return all_mappings.find((m) => m.project_name === projectName)
	}

	// Load entries for today on mount
	onMount(() => {
		handleDateChange()
	})
</script>

<div class="d-flex flex-row justify-content-end" style="margin-bottom: 1rem;">
	<input
		type="date"
		bind:value={query_date}
		on:change={handleDateChange}
		class="form-control form-control-sm"
		style="max-width: 300px" />
</div>

{#if loading}
	<p>Loading...</p>
{:else if entries.length > 0}
	<ul class="list-group">
		{#each entries as entry}
			<li class="list-group-item">
				<div class="row">
					<div class="col-6">{entry.description || "(no description)"}</div>
					<div class="col-auto">
						{#if getProjectName(entry.projectId)}
							<span class="badge bg-secondary">{getProjectName(entry.projectId)}</span>
						{/if}
					</div>
					<div class="col-auto"><i class="fa fa-arrow-right" aria-hidden="true"></i></div>
					<div class="col-auto">
						{#if getMappingForProject(getProjectName(entry.projectId))}
							<span class="badge bg-success">
								{getMappingForProject(getProjectName(entry.projectId)).work_type} -
								{getMappingForProject(getProjectName(entry.projectId)).task_activity}
							</span>
						{:else}
							<span class="badge bg-danger">No Mapping</span>
						{/if}
					</div>
				</div>
				<small class="text-muted">
					{luxon.DateTime.fromISO(entry.timeInterval.start).toFormat("HH:mm")} -
					{entry.timeInterval.end ? luxon.DateTime.fromISO(entry.timeInterval.end).toFormat("HH:mm") : "running"}
					({formatDuration(entry.timeInterval.duration)})
				</small>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-muted">No entries found for {query_date}</p>
{/if}

