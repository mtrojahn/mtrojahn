import { writable } from "svelte/store"
import { browser } from "$app/environment"
import uuid from "uuid-v4"
import * as luxon from "luxon"

const loadSettings = () => {
	if (!browser) return {}
	return JSON.parse(
		localStorage.getItem("settings") ||
			JSON.stringify({
				daily_reset_time: null,
				weekly_reset_day: null,
				weekly_reset_time: null
			})
	)
}

const settings = writable(loadSettings())

settings.subscribe((settings) => {
	if (!browser) return
	localStorage.setItem("settings", JSON.stringify(settings))
})

const loadTasks = () => {
	if (!browser) return []
	return JSON.parse(localStorage.getItem("tasks") || "[]")
}

const tasks = writable(loadTasks())

tasks.subscribe((tasks) => {
	if (!browser) return
	localStorage.setItem("tasks", JSON.stringify(tasks))
})

const addTask = (name, frequency = null) => {
	const match = name.match(/^(.+?)\s*x\s*(\d+)$/i)
	let amount = null
	if (match) {
		name = match[1].trim()
		amount = parseInt(match[2])
	}
	tasks.update((tasks) => {
		const newTask = {
			id: uuid(),
			name: name.trim(),
			amount,
			original_amount: amount,
			frequency,
			completed: false,
			last_reset: luxon.DateTime.local().set({ second: 0 }).toISO()
		}
		const sorted = [...tasks, newTask].sort((a, b) => a.name.localeCompare(b.name))
		localStorage.setItem("tasks", JSON.stringify(sorted))
		return sorted
	})
}

const deleteTask = (id) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.filter((task) => task.id !== id)
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

const toggleCompleted = (id) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					completed: !task.completed,
					last_reset: luxon.DateTime.local().set({ second: 0 }).toISO()
				}
			}
			return task
		})
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

const updateAmount = (id, amount) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.map((task) => {
			if (task.id === id) {
				const completed = task.amount === 0
				return {
					...task,
					amount,
					completed
				}
			}
			return task
		})
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

const updateName = (id, name) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					name
				}
			}
			return task
		})
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

export { tasks, addTask, toggleCompleted, deleteTask, updateAmount, updateName, settings }
