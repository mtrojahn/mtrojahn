<script>
	import { convertCurrentEntriesToChunks, mappings, loadProjects } from "$lib/stores/ClockifyExportStore.js"
	import { onMount } from "svelte"

	let projects = []
	let pasteableOutput = ""

	function getMappingForProject(projectName) {
		const all_mappings = $mappings
		return all_mappings.find((m) => m.project_name === projectName)
	}

	function getProjectName(projectId) {
		const project = projects.find((p) => p.id === projectId)
		return project ? project.name : ""
	}

	onMount(async () => {
		projects = await loadProjects()

		const chunks = convertCurrentEntriesToChunks()
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
		let table = "<table>"
		let body = parsed
			.map((p) => {
				return `<tr><td>${p.start}</td><td>${p.mapping ? p.mapping.work_type : ""}</td><td>${p.mapping ? p.mapping.task_activity : ""}</td><td>${p.description}</td></tr>`
			})
			.join("\n")
		table += body + "</table>"
		pasteableOutput = table
	})
</script>

{@html pasteableOutput}
