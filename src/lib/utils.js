/**
 * Encode text into a base64url slug for use in URLs.
 * @param {string} text
 * @returns {string}
 */
export function encodeResult(text) {
	return btoa(unescape(encodeURIComponent(text)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
}

/**
 * Decode a base64url slug back to the original text.
 * @param {string} slug
 * @returns {string}
 */
export function decodeResult(slug) {
	const base64 = slug.replace(/-/g, '+').replace(/_/g, '/');
	return decodeURIComponent(escape(atob(base64)));
}
