<script>
	import { base } from "$app/paths"
	import ButtonBar from "$lib/components/ButtonBar.svelte"

	const tools = [
		{
			href: `${base}/clockify-export/main`,
			title: "Clockify Export",
			description: "Clockify Export Tool",
			icon: "fa-clock",
			color: "primary",
			emoji: "⏰"
		},
		{
			href: `${base}/gaming-tasks-app/main`,
			title: "Gaming Tasks",
			description: "Gaming Tasks Tool",
			icon: "fa-gamepad",
			color: "success",
			emoji: "🎮"
		}
	]
</script>

<div class="container py-5">
	<div class="d-flex justify-content-end mb-4">
		<ButtonBar />
	</div>
	<div class="text-center mb-5">
		<h1 class="display-5 fw-bold mb-2">Random Tools in Svelte</h1>
	</div>

	<div class="row g-4 justify-content-center">
		{#each tools as tool}
			<div class="col-md-5 col-lg-4">
				<a href={tool.href} class="text-decoration-none">
					<div class="card h-100 shadow-sm border-0 tool-card position-relative overflow-hidden">
						<div class="card-body p-4">
							<div class="d-flex align-items-center mb-3">
								<div class="icon-wrapper bg-{tool.color} bg-opacity-10 rounded-3 p-3 me-3">
									<span class="fs-2">{tool.emoji}</span>
								</div>
								<div>
									<h5 class="card-title mb-0 fw-bold">{tool.title}</h5>
									<small class="text-muted">
										<i class="fa {tool.icon} me-1"></i>
										Launch
									</small>
								</div>
							</div>
							<p class="card-text text-secondary mb-0">{tool.description}</p>
						</div>
						<div class="card-arrow position-absolute end-0 bottom-0 p-3 opacity-25">
							<i class="fa fa-arrow-right fa-2x text-{tool.color}"></i>
						</div>
						<div class="hover-indicator position-absolute start-0 top-0 h-100 bg-{tool.color}" style="width: 4px;">
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.tool-card {
		transition: all 0.2s ease;
	}

	.tool-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1) !important;
	}

	.tool-card:hover .card-arrow {
		opacity: 1;
		transform: translateX(4px);
		transition: all 0.2s ease;
	}

	.icon-wrapper {
		transition: transform 0.2s ease;
	}

	.tool-card:hover .icon-wrapper {
		transform: scale(1.1);
	}

	.hover-indicator {
		transform: scaleY(0);
		transition: transform 0.2s ease;
	}

	.tool-card:hover .hover-indicator {
		transform: scaleY(1);
	}
</style>
