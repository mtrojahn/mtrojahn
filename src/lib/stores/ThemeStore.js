import { writable } from "svelte/store"

const loadSettings = () => {
	if (typeof window === "undefined") return { theme: "light" }
	return JSON.parse(localStorage.getItem("themeSettings") || JSON.stringify({ theme: "light" }))
}

const themeSettings = writable(loadSettings())

themeSettings.subscribe((settings) => {
	if (typeof window === "undefined") return
	localStorage.setItem("themeSettings", JSON.stringify(settings))
	document.documentElement.setAttribute("data-bs-theme", settings.theme)
})

export { themeSettings }
