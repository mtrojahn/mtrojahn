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

const loadAuth = () => {
	if (!browser) return {}
	return JSON.parse(localStorage.getItem("clockify_auth") || JSON.stringify({ token: "", workspace: "", user: "" }))
}

const auth = writable(loadAuth())

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

auth.subscribe((auth) => {
	if (!browser) return
	localStorage.setItem("clockify_auth", JSON.stringify(auth))
})

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
	const start = luxon.DateTime.fromISO(entry.timeInterval.start, { setZone: "utc" })
	const end = luxon.DateTime.fromISO(entry.timeInterval.end, { setZone: "utc" })
	const chunkMs = chunkMinutes * 60 * 1000

	const chunks = []
	let current = start

	while (current < end) {
		const chunkEnd = luxon.DateTime.fromMillis(Math.min(current.toMillis() + chunkMs, end.toMillis()), {
			setZone: "utc"
		})

		chunks.push({
			description: entry.description,
			projectId: entry.projectId,
			start: current,
			end: chunkEnd
		})

		current = chunkEnd
	}

	return chunks
}

const convertCurrentEntriesToChunks = () => {
	const entries = ENTRIES_CACHE.map((entry) => splitIntoChunks(entry)).flat()
	return entries
}

export { auth, loadTimeEntries, loadProjects, mappings, addMapping, deleteMapping, convertCurrentEntriesToChunks }
