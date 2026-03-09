import { writable } from "svelte/store"
import { browser } from "$app/environment"
import * as luxon from "luxon"

import ky from "ky"

const CLOCKIFY_API = "https://api.clockify.me/api/v1"
let PROJECTS_CACHE = []
let ENTRIES_CACHE = []

const clockifyGet = async (endpoint, options = {}) => {
	const { token } = loadAuth()
	if (!token) throw new Error("No auth token")

	return ky
		.get(`${CLOCKIFY_API}${endpoint}`, {
			headers: { "X-Api-Key": token },
			...options
		})
		.json()
}

const selectedDate = writable(luxon.DateTime.now().minus({ days: 1 }).toISODate())

const loadAuth = () => {
	if (!browser) return {}
	return JSON.parse(
		localStorage.getItem("clockify_auth") ||
			JSON.stringify({ token: "", workspace: "659c1fc8b180a1576ddf8aab", user: "" })
	)
}

const auth = writable(loadAuth())

auth.subscribe((auth) => {
	if (!browser) return
	localStorage.setItem("clockify_auth", JSON.stringify(auth))
})

const loadMappings = () => {
	if (!browser) return []
	return JSON.parse(localStorage.getItem("clockify_mappings") || "[]")
}

const mappings = writable(loadMappings())

mappings.subscribe((mappings) => {
	if (!browser) return
	localStorage.setItem("clockify_mappings", JSON.stringify(mappings))
})

const addMapping = (project_name, work_type, task_activity) => {
	mappings.update((mappings) => {
		const newMapping = {
			project_name: project_name.trim(),
			work_type: work_type.trim(),
			task_activity: task_activity.trim()
		}
		const sorted = [...mappings, newMapping].sort((a, b) => a.project_name.localeCompare(b.project_name))
		localStorage.setItem("clockify_mappings", JSON.stringify(sorted))
		return sorted
	})
}

const deleteMapping = (project_name) => {
	mappings.update((mappings) => {
		const updated = mappings.filter((m) => m.project_name !== project_name)
		localStorage.setItem("clockify_mappings", JSON.stringify(updated))
		return updated
	})
}

const loadTimeEntries = async (date) => {
	if (!browser) return []

	const { workspace, user } = loadAuth()
	if (!workspace || !user) return []

	// Force UTC zone instead of local browser timezone
	const dt = luxon.DateTime.fromISO(date + "T00:00:00Z", { setZone: "utc" })
	const start = dt.startOf("day")
	const end = dt.endOf("day")

	try {
		const entries = await clockifyGet(`/workspaces/${workspace}/user/${user}/time-entries`, {
			searchParams: {
				start: start.toISO(),
				end: end.toISO(),
				pageSize: 5000
			}
		})
		// sort by start time ascending
		entries.sort((a, b) => new Date(a.timeInterval.start) - new Date(b.timeInterval.start))

		ENTRIES_CACHE = entries
		return entries
	} catch (error) {
		console.error("Failed to load time entries:", error)
		return []
	}
}

const loadProjects = async (forceRefresh = false) => {
	if (!browser) return []

	if (!forceRefresh && PROJECTS_CACHE.length > 0) {
		return PROJECTS_CACHE
	}

	const { workspace } = loadAuth()
	if (!workspace) return []

	try {
		const projects = await clockifyGet(`/workspaces/${workspace}/projects`, {
			searchParams: {
				pageSize: 5000,
				archived: false
			}
		})

		PROJECTS_CACHE = projects
		return projects
	} catch (error) {
		console.error("Failed to load projects:", error)
		return PROJECTS_CACHE || []
	}
}

function splitIntoChunks(entry, chunkMinutes = 30) {
	const start = luxon.DateTime.fromISO(entry.timeInterval.start, { zone: "utc" })
	const end = luxon.DateTime.fromISO(entry.timeInterval.end, { zone: "utc" })

	const chunks = []
	let current = start

	console.log({entry, start, end})

	while (current < end) {
		const next = current.plus({ minutes: chunkMinutes })
		const chunkEnd = next < end ? next : end

		// description can be split with the | sign. If there are multiple parts, only the first one is used for all chunks.
		const description = entry.description.split("|")[0].trim()

		chunks.push({
			description: description,
			projectId: entry.projectId,
			start: current,
			end: chunkEnd
		})

		current = chunkEnd
	}

	return chunks
}

const convertCurrentEntriesToChunks = () => {
	const sorted = [...ENTRIES_CACHE].sort(
		(a, b) => Date.parse(a.timeInterval.start) - Date.parse(b.timeInterval.start)
	)

	const chunks = []
	let previousEnd = null

	for (const entry of sorted) {
		const start = luxon.DateTime.fromISO(entry.timeInterval.start, { zone: "utc" })
		const end = luxon.DateTime.fromISO(entry.timeInterval.end, { zone: "utc" })

		// fill gap before this entry
		if (previousEnd && start > previousEnd) {
			let gapCurrent = previousEnd

			while (gapCurrent < start) {
				const next = gapCurrent.plus({ minutes: 30 })
				const gapEnd = next < start ? next : start

				chunks.push({
					description: "",
					projectId: null,
					start: gapCurrent,
					end: gapEnd
				})

				gapCurrent = gapEnd
			}
		}

		// split real entry
		chunks.push(...splitIntoChunks(entry))

		previousEnd = end
	}

	return chunks
}

export {
	auth,
	loadTimeEntries,
	loadProjects,
	mappings,
	addMapping,
	deleteMapping,
	convertCurrentEntriesToChunks,
	selectedDate
}
