<script>
	import { goto } from '$app/navigation';
</script>

<div class="container">
	<h1>Logic Test</h1>
	<p class="subtitle">Chat with our AI to test your logical reasoning skills. Answer a series of questions and get your score at the end.</p>
	<button onclick={() => goto('/chat')}>Start Test</button>
</div>
