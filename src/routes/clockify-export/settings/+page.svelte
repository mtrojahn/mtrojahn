<script>
	import { auth, mappings, addMapping, deleteMapping } from "$lib/stores/ClockifyExportStore.js"

	let confs = $auth

	$: {
		auth.update((a) => {
			a.token = confs.token
			a.workspace = confs.workspace
			a.user = confs.user
			return a
		})
	}
	$: all_mappings = $mappings
	let new_project_name = ""
	let new_work_type = ""
	let new_task_activity = ""
</script>

<h6>Data Mappings</h6>
<div class="d-flex flex-row justify-content-end">
	<input
		type="text"
		class="form-control form-control-sm"
		placeholder="Project Name"
		bind:value={new_project_name}
		style="max-width: 200px" />
	<input
		type="text"
		class="form-control form-control-sm ms-3"
		placeholder="Work Type"
		bind:value={new_work_type}
		style="max-width: 200px" />
	<input
		type="text"
		class="form-control form-control-sm ms-3"
		placeholder="Task Activity"
		bind:value={new_task_activity}
		style="max-width: 200px" />
	<button
		type="button"
		class="btn btn-primary btn-sm ms-3"
		on:click={() => addMapping(new_project_name, new_work_type, new_task_activity)}>
		<i class="fa fa-plus" aria-hidden="true"></i>
	</button>
</div>
<div class="row mx-1 mt-4">
	<table class="table table-striped">
		<tr>
			<th scope="col">Project Name</th>
			<th scope="col">Task Name</th>
			<th scope="col">Task Activity</th>
			<th scope="col" style="width: 100px"></th>
		</tr>
		<tbody>
			{#each all_mappings as mapping}
				<tr>
					<td>{mapping.project_name}</td>
					<td>{mapping.work_type}</td>
					<td>{mapping.task_activity}</td>
					<td class="text-end">
						<button type="button" class="btn btn-danger btn-sm" on:click={() => deleteMapping(mapping.project_name)}>
							<i class="fa fa-trash" aria-hidden="true"></i>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<hr />

<h6>Clockify Settings</h6>
<form>
	<div class="row mb-3">
		<label for="api-token" class="col-sm-4 col-form-label">Clockify API Token</label>
		<div class="col-sm-8">
			<input
				type="password"
				class="form-control form-control-sm"
				id="api-token"
				placeholder="Enter your Clockify API Token"
				bind:value={confs.token} />
		</div>
	</div>
	<div class="row mb-3">
		<label for="workspace-id" class="col-sm-4 col-form-label">Workspace ID</label>
		<div class="col-sm-8">
			<input
				type="password"
				class="form-control form-control-sm"
				id="workspace-id"
				placeholder="Enter your Clockify Workspace ID"
				bind:value={confs.workspace} />
		</div>
	</div>
	<div class="row mb-3">
		<label for="user-id" class="col-sm-4 col-form-label">User ID</label>
		<div class="col-sm-8">
			<input
				type="password"
				class="form-control form-control-sm"
				id="user-id"
				placeholder="Enter your Clockify User ID"
				bind:value={confs.user} />
		</div>
	</div>
</form>

<style>
	th {
		padding: 0.5rem 0.5rem;
	}
</style>
