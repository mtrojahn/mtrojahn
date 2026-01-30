import * as luxon from "luxon"

function formatDuration(durationString) {
	if (!durationString) return "0 min"

	const duration = luxon.Duration.fromISO(durationString)
	const hours = Math.floor(duration.as("hours"))
	const minutes = Math.floor(duration.as("minutes") % 60)

	if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
	if (hours > 0) return `${hours}h`
	return `${minutes}m`
}

export { formatDuration }
