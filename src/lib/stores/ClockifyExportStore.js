import { writable } from "svelte/store"
import { browser } from "$app/environment"

const loadAuth = () => {
	if (!browser) return {}
	return JSON.parse(localStorage.getItem("clockify_auth") || JSON.stringify({ token: "", workspace: "", user: "" }))
}

const auth = writable(loadAuth())

auth.subscribe((auth) => {
	if (!browser) return
	localStorage.setItem("clockify_auth", JSON.stringify(auth))
})

export { auth }
