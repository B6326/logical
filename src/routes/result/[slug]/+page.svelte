<script>
	let { data } = $props();
	let toastVisible = $state(false);

	async function share() {
		const url = window.location.href;

		if (navigator.share) {
			try {
				await navigator.share({ title: 'My Logic Test Result', url });
				return;
			} catch {
				// User cancelled or share failed — fall through to clipboard
			}
		}

		await navigator.clipboard.writeText(url);
		toastVisible = true;
		setTimeout(() => (toastVisible = false), 2000);
	}
</script>

<div class="container">
	<h1>Your Result</h1>
	<div class="result-text">{data.text}</div>

	<div class="actions">
		<button onclick={share}>Share</button>
		<a href="/">Try it yourself</a>
	</div>
</div>

<div class="toast" class:visible={toastVisible}>Link copied to clipboard!</div>
