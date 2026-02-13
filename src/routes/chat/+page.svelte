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
		<span class="chat-title">Logic Test</span>
		{#if hasUserMessages}
			<button class="end-btn" onclick={endChat}>End Chat</button>
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
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
	}

	.chat-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid #e0e0e0;
	}

	.chat-title {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.end-btn {
		padding: 0.4rem 0.875rem;
		font-size: 0.8125rem;
		background: transparent;
		color: #111;
		border: 1px solid #e0e0e0;
	}

	.end-btn:hover {
		background: #f5f5f5;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.bubble {
		max-width: 80%;
		padding: 0.625rem 0.875rem;
		border-radius: 12px;
		line-height: 1.4;
		word-break: break-word;
		font-size: 0.9375rem;
	}

	.bubble.user {
		align-self: flex-end;
		background: #111;
		color: #fff;
		border-bottom-right-radius: 4px;
	}

	.bubble.ai {
		align-self: flex-start;
		background: #f5f5f5;
		border-bottom-left-radius: 4px;
	}

	.bubble.typing {
		opacity: 0.5;
		font-style: italic;
	}

	.chat-input-bar {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-top: 1px solid #e0e0e0;
	}

	.chat-input-bar input {
		flex: 1;
	}

	.chat-input-bar button {
		flex-shrink: 0;
	}
</style>
