<script>
	import { goto } from '$app/navigation';
	import { encodeResult } from '$lib/utils.js';

	let text = $state('');

	function submit() {
		if (!text.trim()) return;
		const slug = encodeResult(text.trim());
		goto(`/result/${slug}`);
	}
</script>

<div class="container">
	<h1>Logic Test</h1>

	<!-- INPUT SECTION START — replace this block with your test logic -->
	<form onsubmit={(e) => { e.preventDefault(); submit(); }} style="display:flex;flex-direction:column;gap:1rem;">
		<input type="text" bind:value={text} placeholder="Enter your answer..." />
		<button type="submit" disabled={!text.trim()}>See My Result</button>
	</form>
	<!-- INPUT SECTION END -->
</div>
