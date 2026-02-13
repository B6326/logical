let messages = $state([]);

export function getMessages() {
	return messages;
}

export function addMessage(role, text) {
	messages.push({ role, text });
}

export function clearMessages() {
	messages.length = 0;
}
