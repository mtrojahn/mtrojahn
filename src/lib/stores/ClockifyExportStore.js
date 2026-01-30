import { writable } from "svelte/store"
import { browser } from "$app/environment"
import { DateTime } from "luxon"
import ky from "ky"

const CLOCKIFY_API = "https://api.clockify.me/api/v1"
let PROJECTS_CACHE = []

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

auth.subscribe((auth) => {
	if (!browser) return
	localStorage.setItem("clockify_auth", JSON.stringify(auth))
})

const loadTimeEntries = async (date) => {
	if (!browser) return []

	const { workspace, user } = loadAuth()
	if (!workspace || !user) return []

	const dt = DateTime.fromISO(date, { zone: "local" }).toUTC()
	const start = dt.startOf("day")
	const end = dt.endOf("day")

	try {
		return await clockifyGet(`/workspaces/${workspace}/user/${user}/time-entries`, {
			searchParams: {
				start: start.toISO(),
				end: end.toISO(),
				pageSize: 5000
			}
		})
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

export { auth, loadTimeEntries, loadProjects }
