<script>
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { getMessages, addMessage, clearMessages } from '$lib/chat-state.svelte.js';

	const dummyResponses = [
		"That's an interesting perspective. Can you explain your reasoning?",
		"I see. Now consider this: if all roses are flowers, and some flowers fade quickly, can we conclude that some roses fade quickly?",
		"Good answer. Here's another one: if it's raining, the ground is wet. The ground is wet. Is it necessarily raining?",
		"Think about it this way — correlation doesn't imply causation. What do you think?",
		"Interesting! Let's try something different. If no cats are dogs, and some dogs are pets, what can we say about cats and pets?",
		"That's a solid line of reasoning. Can you think of a counterexample?",
		"Almost there. Let's try one more: if all A are B, and all B are C, what can we say about A and C?"
	];

	let input = $state('');
	let responding = $state(false);
	let responseIndex = 0;
	let messagesContainer;

	const messages = getMessages();

	onMount(() => {
		clearMessages();
	});

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	async function send() {
		const text = input.trim();
		if (!text || responding) return;

		addMessage('user', text);
		input = '';
		responding = true;
		await scrollToBottom();

		const delay = 500 + Math.random() * 500;
		setTimeout(async () => {
			const reply = dummyResponses[responseIndex % dummyResponses.length];
			responseIndex++;
			addMessage('ai', reply);
			responding = false;
			await scrollToBottom();
		}, delay);
	}

	function endChat() {
		goto('/evaluating');
	}

	const hasUserMessages = $derived(messages.some((m) => m.role === 'user'));
</script>

<div class="chat-page">
	<header class="chat-header">
		<h1>Logic Test</h1>
		{#if hasUserMessages}
			<button class="end-chat-btn" onclick={endChat}>End Chat</button>
		{/if}
	</header>

	<div class="chat-messages" bind:this={messagesContainer}>
		{#each messages as msg}
			<div class="bubble {msg.role}">
				{msg.text}
			</div>
		{/each}
		{#if responding}
			<div class="bubble ai typing">Thinking...</div>
		{/if}
	</div>

	<form class="chat-input-bar" onsubmit={(e) => { e.preventDefault(); send(); }}>
		<input type="text" bind:value={input} placeholder="Type your answer..." disabled={responding} />
		<button type="submit" disabled={!input.trim() || responding}>Send</button>
	</form>
</div>

<style>
	.chat-page {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		max-width: 600px;
		margin: 0 auto;
		width: 100%;
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #dee2e6;
		background: #fff;
	}

	.chat-header h1 {
		font-size: 1.25rem;
		margin-bottom: 0;
	}

	.end-chat-btn {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		background: #e74c3c;
	}

	.end-chat-btn:hover {
		background: #c0392b;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.bubble {
		max-width: 80%;
		padding: 0.75rem 1rem;
		border-radius: 12px;
		line-height: 1.4;
		word-break: break-word;
	}

	.bubble.user {
		align-self: flex-end;
		background: #4361ee;
		color: #fff;
		border-bottom-right-radius: 4px;
	}

	.bubble.ai {
		align-self: flex-start;
		background: #fff;
		border: 1px solid #dee2e6;
		border-bottom-left-radius: 4px;
	}

	.bubble.typing {
		opacity: 0.6;
		font-style: italic;
	}

	.chat-input-bar {
		display: flex;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		border-top: 1px solid #dee2e6;
		background: #fff;
	}

	.chat-input-bar input {
		flex: 1;
	}

	.chat-input-bar button {
		flex-shrink: 0;
	}
</style>
