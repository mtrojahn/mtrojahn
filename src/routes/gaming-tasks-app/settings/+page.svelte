<script>
	import { settings } from "$lib/stores/GamingTaskStore.js"

	const weekdays = [
		{ value: 0, label: "Sunday" },
		{ value: 1, label: "Monday" },
		{ value: 2, label: "Tuesday" },
		{ value: 3, label: "Wednesday" },
		{ value: 4, label: "Thursday" },
		{ value: 5, label: "Friday" },
		{ value: 6, label: "Saturday" }
	]

	let confs = $settings
	let daily_reset_time = confs.daily_reset_time
	let weekly_reset_day = confs.weekly_reset_day
	let weekly_reset_time = confs.weekly_reset_time

	$: {
		settings.update((s) => {
			s.daily_reset_time = daily_reset_time
			s.weekly_reset_day = weekly_reset_day
			s.weekly_reset_time = weekly_reset_time
			return s
		})
	}
</script>

<form>
	<div class="row mb-3">
		<label for="daily-expiration" class="col-sm-4 col-form-label">Time to expire daily tasks</label>
		<div class="col-sm-8">
			<input type="time" class="form-control" id="daily-expiration" bind:value={daily_reset_time} />
		</div>
	</div>
	<hr />
	<div class="row mb-3">
		<label for="weekly-expiration" class="col-sm-4 col-form-label">Weekday to expire weekly tasks</label>
		<div class="col-sm-8">
			<select bind:value={weekly_reset_day} class="form-select">
				{#each weekdays as { value, label }}
					<option {value}>{label}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="row mb-3">
		<label for="daily-expiration" class="col-sm-4 col-form-label">Time to expire weekly tasks</label>
		<div class="col-sm-8">
			<input type="time" class="form-control" id="daily-expiration" bind:value={weekly_reset_time} />
		</div>
	</div>
</form>
