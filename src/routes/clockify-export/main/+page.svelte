<script>
	import * as luxon from "luxon"
	import { onMount } from "svelte"
	import {
		loadTimeEntries,
		loadProjects,
		mappings,
		convertCurrentEntriesToChunks,
		selectedDate
	} from "$lib/stores/ClockifyExportStore.js"
	import { formatDuration } from "$lib/helpers/strings.js"

	let entries = []
	let loading = false
	let projects = []
	let include_descriptions = false
	let exported_data = ""

	function getProjectName(projectId) {
		const project = projects.find((p) => p.id === projectId)
		return project ? project.name : ""
	}

	async function handleDateChange() {
		if (!$selectedDate) return
		exported_data = ""

		loading = true
		// Load both in parallel
		const [entriesData, projectsData] = await Promise.all([loadTimeEntries($selectedDate), loadProjects()])
		entries = entriesData
		projects = projectsData
		loading = false
	}

	function getMappingForProject(projectName) {
		const all_mappings = $mappings
		return all_mappings.find((m) => m.project_name === projectName)
	}

	function showFadeOutMessage(message) {
		const messageDiv = document.createElement("div")
		messageDiv.textContent = message
		messageDiv.style.position = "fixed"
		messageDiv.style.top = "10px"
		messageDiv.style.right = "10px"
		messageDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
		messageDiv.style.color = "white"
		messageDiv.style.padding = "10px"
		messageDiv.style.borderRadius = "5px"
		document.body.appendChild(messageDiv)

		setTimeout(() => {
			messageDiv.style.transition = "opacity 1s"
			messageDiv.style.opacity = "0"
			setTimeout(() => {
				document.body.removeChild(messageDiv)
			}, 1000)
		}, 3000)
	}

	function exportToExcel() {
		const chunks = convertCurrentEntriesToChunks(entries)
		const parsed = chunks
			.sort((a, b) => a.start - b.start)
			.map((chunk) => {
				return {
					description: chunk.description,
					mapping: getMappingForProject(getProjectName(chunk.projectId)),
					// only need time in format like 21:30
					start: chunk.start.toFormat("HH:mm")
				}
			})
		let tsv = parsed
			.map((p) => {
				const description =
					include_descriptions && p.description ? "'" + p.description.replace(/\t/g, " ").replace(/\n/g, " ") : ""
				const workType = p.mapping ? (p.mapping.work_type || "").replace(/\t/g, " ") : ""
				const taskActivity = p.mapping ? (p.mapping.task_activity || "").replace(/\t/g, " ") : ""

				return `${p.start}\t${workType}\t${taskActivity}\t${description}`
			})
			.join("\n")
		navigator.clipboard.writeText(tsv)
		exported_data = tsv
		showFadeOutMessage("Exported to clipboard!")
	}

	// Load entries for today on mount
	onMount(() => {
		handleDateChange()
	})
</script>

<div class="d-flex flex-row justify-content-end" style="margin-bottom: 1rem;">
	<input
		type="date"
		bind:value={$selectedDate}
		on:change={handleDateChange}
		class="form-control form-control-sm"
		style="max-width: 300px" />
</div>

{#if loading}
	<p>Loading...</p>
{:else if entries.length > 0}
	<div class="row mb-2">
		<div class="d-flex flex-row justify-content-end">
			<div class="me-2 pt-1">
				<label>
					<input type="checkbox" bind:checked={include_descriptions} />
					Include Descriptions
				</label>
			</div>
			<div>
				<button class="btn btn-primary btn-sm" on:click={() => exportToExcel()}>Export to Excel (Clipboard)</button>
			</div>
		</div>
	</div>
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
					{luxon.DateTime.fromISO(entry.timeInterval.start, { setZone: "utc" }).toFormat("HH:mm")} -
					{entry.timeInterval.end
						? luxon.DateTime.fromISO(entry.timeInterval.end, { setZone: "utc" }).toFormat("HH:mm")
						: "running"}
					({formatDuration(entry.timeInterval.duration)})
				</small>
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-muted">No entries found for {$selectedDate}</p>
{/if}

{#if exported_data}
	<div class="mt-4">
		<h6>This is how the exported data looks like:</h6>
		<pre style="white-space: pre-wrap;">{exported_data}</pre>
	</div>
{/if}
