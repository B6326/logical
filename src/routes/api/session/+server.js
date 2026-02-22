import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function POST() {
	try {
		// 세션 생성
		const { data: session, error } = await supabase
			.from('test_sessions')
			.insert({})
			.select()
			.single()

		if (error) throw error

		return json({ session })
	} catch (error) {
		console.error('Session creation error:', error)
		return json({ error: error.message }, { status: 500 })
	}
}