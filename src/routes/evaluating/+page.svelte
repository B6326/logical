<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { encodeResult } from '$lib/utils.js';
	import { getMessages } from '$lib/chat-state.svelte.js';

	let progress = $state(0);
	let statusText = $state('Analyzing...');

	onMount(() => {
		const messages = getMessages();
		const userMessages = messages.filter((m) => m.role === 'user');

		if (userMessages.length === 0) {
			goto('/', { replaceState: true });
			return;
		}

		const interval = setInterval(() => {
			progress += 2;
			if (progress >= 50 && statusText === 'Analyzing...') {
				statusText = 'Computing...';
			}
			if (progress >= 100) {
				clearInterval(interval);
				const score = `You answered ${userMessages.length} question${userMessages.length === 1 ? '' : 's'} in the logic test.`;
				const slug = encodeResult(score);
				goto(`/result/${slug}`, { replaceState: true });
			}
		}, 40);

		return () => clearInterval(interval);
	});
</script>

<div class="container">
	<h1>Evaluating</h1>
	<p class="subtitle">{statusText}</p>
	<div class="progress-track">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>
</div>

<style>
	.progress-track {
		width: 100%;
		height: 4px;
		background: #e0e0e0;
		border-radius: 2px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #111;
		border-radius: 2px;
		transition: width 0.04s linear;
	}
</style>
