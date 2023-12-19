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

const addTask = (name, frequency) => {
	tasks.update((tasks) => {
		const newTask = {
			id: uuid(),
			name,
			frequency,
			completed: false,
			last_reset: luxon.DateTime.local().set({ second: 0 }).toISO()
		}
		const newTaskList = [...tasks, newTask]
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

const deleteTask = (id) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.filter((task) => task.id !== id)
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

const updateTask = (id, task) => {
	tasks.update((tasks) => {
		const newTaskList = tasks.map((t) => {
			if (t.id === id) {
				return task
			}
			return t
		})
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
					completed: !task.completed
				}
			}
			return task
		})
		localStorage.setItem("tasks", JSON.stringify(newTaskList))
		return newTaskList
	})
}

export { tasks, addTask, toggleCompleted, deleteTask, settings, updateTask }
