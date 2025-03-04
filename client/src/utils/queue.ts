export default class Queue {
	items: any[]
	constructor() {
		this.items = []
	}

	enqueue(element: any) {
		this.items.push(element)
	}

	dequeue() {
		if (this.isEmpty()) {
			return null
		}
		return this.items.shift()
	}

	isEmpty() {
		return this.items.length === 0
	}
}
