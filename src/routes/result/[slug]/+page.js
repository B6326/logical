import { decodeResult } from '$lib/utils.js';

export function load({ params }) {
	const text = decodeResult(params.slug);
	return { text };
}
