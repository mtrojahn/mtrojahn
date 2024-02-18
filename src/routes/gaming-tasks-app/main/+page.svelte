<script>
	import * as luxon from "luxon"
	import { onMount } from "svelte"
	import { addTask, deleteTask, settings, tasks, toggleCompleted } from "$lib/stores/GamingTaskStore.js"

	$: all_tasks = $tasks
		.filter((task) => ["DAILY", "WEEKLY"].includes(task.frequency))
		.sort((a, b) => a.name.localeCompare(b.name) && a.frequency.localeCompare(b.frequency))
		.concat($tasks.filter((task) => task.frequency === "PERMANENT"))
	$: confs = $settings

	const isDailyExpired = (task) => {
		const now = luxon.DateTime.local()
		const splitDailyResetTime = confs.daily_reset_time.split(":")

		let lastResetTime = luxon.DateTime.local().set({
			hour: splitDailyResetTime[0],
			minute: splitDailyResetTime[1],
			second: 0
		})
		if (lastResetTime > now) {
			lastResetTime = lastResetTime.minus({ days: 1 })
		}
		const taskLastReset = luxon.DateTime.fromISO(task.last_reset)
		return taskLastReset < lastResetTime && task.completed
	}

	const isWeeklyExpired = (task) => {
		const now = luxon.DateTime.local()
		if (confs.weekly_reset_day !== luxon.DateTime.local().weekday) {
			return false
		}
		const splitWeeklyResetTime = confs.weekly_reset_time.split(":")
		let lastWeekResetTime = luxon.DateTime.local().set({
			hour: splitWeeklyResetTime[0],
			minute: splitWeeklyResetTime[1],
			second: 0
		})
		if (lastWeekResetTime > now) {
			lastWeekResetTime = lastWeekResetTime.minus({ days: 7 })
		}
		const taskLastReset = luxon.DateTime.fromISO(task.last_reset)
		return taskLastReset < lastWeekResetTime && task.completed
	}

	onMount(() => {
		const parsed = $tasks.map((task) => {
			if (
				(task.frequency === "DAILY" && isDailyExpired(task)) ||
				(task.frequency === "WEEKLY" && isWeeklyExpired(task))
			) {
				task.completed = false
				task.last_reset = luxon.DateTime.local().set({ second: 0 }).toISO()
			}
			return task
		})
		tasks.set(parsed)
	})

	let new_task_type = "DAILY"
	let new_task_name = ""

	const add = (name, frequency) => {
		addTask(name, frequency)
		new_task_type = "DAILY"
		new_task_name = ""
	}
</script>

<div class="d-flex flex-row justify-content-end">
	<input
		type="text"
		class="form-control form-control-sm"
		placeholder="New Task"
		bind:value={new_task_name}
		style="max-width: 300px" />
	<select class="form-select form-select-sm ms-3" style="max-width: 150px" bind:value={new_task_type}>
		<option value="DAILY">Daily</option>
		<option value="WEEKLY">Weekly</option>
		<option value="PERMANENT">Permanent</option>
	</select>
	<button type="button" class="btn btn-primary btn-sm ms-3" on:click={() => add(new_task_name, new_task_type)}>
		<i class="fa fa-plus" aria-hidden="true"></i>
	</button>
</div>

<h6>Tasks</h6>
<div class="row mx-1 mt-4">
	<table class="table table-striped">
		<tr>
			<th style="width: 150px;">Done</th>
			<th>Task</th>
			<th class="text-end">Frequency</th>
			<th style="width: 400px"></th>
		</tr>
		<tbody>
			{#each all_tasks as task}
				<tr>
					<td>
						<input
							class="form-check-input"
							type="checkbox"
							id={task.id}
							checked={task.completed}
							on:change={() => toggleCompleted(task.id)} />
					</td>
					<td>{task.name}</td>
					<td class="text-end">{task.frequency}</td>
					<td class="text-end">
						<i class="fa fa-trash ms-4" aria-hidden="true" on:click={() => deleteTask(task.id)} style="cursor: pointer">
						</i>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
