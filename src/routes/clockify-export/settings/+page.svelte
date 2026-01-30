<script>
	import { auth } from "$lib/stores/ClockifyExportStore.js"

	let confs = $auth

	$: {
		auth.update((a) => {
			a.token = confs.token
			a.workspace = confs.workspace
			a.user = confs.user
			return a
		})
	}
</script>

<form>
	<div class="row mb-3">
		<label for="api-token" class="col-sm-4 col-form-label">Clockify API Token</label>
		<div class="col-sm-8">
			<input
				type="password"
				class="form-control"
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
				class="form-control"
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
				class="form-control"
				id="user-id"
				placeholder="Enter your Clockify User ID"
				bind:value={confs.user} />
		</div>
	</div>
</form>
