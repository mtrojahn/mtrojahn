import uuid from "uuid-v4"
import * as luxon from "luxon"

class ResetFrequency {
	static DAILY = 0
	static WEEKLY = 1
	static MONTHLY = 2
	static NEVER = 3
}

// I don't remember about this class, I think I never used it

class Task {
	/**
	 * Represents a task to be completed.
	 * @param {string} name
	 * @param {?ResetFrequency} frequency
	 */
	constructor(name, frequency = null) {
		const match = name.match(/^(.+?)\s*x\s*(\d+)$/i)
		let amount = null
		if (match) {
			name = match[1].trim()
			amount = parseInt(match[2])
		}
		this.id = uuid()
		this.name = name.trim()
		this.amount = amount
		this.original_amount = amount
		this.frequency = frequency
		this.completed = false
		this.next_reset = null
	}
	nextReset(next_reset) {
		this.next_reset = next_reset
	}
	isExpired() {
		return this.next_reset >= luxon.DateTime.local()
	}
	expire() {
		this.completed = false
		this.amount = this.original_amount
	}
}
