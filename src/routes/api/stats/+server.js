import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function GET() {
	try {
		const { data: stats, error } = await supabase
			.from('logic_type_stats')
			.select('*')
			.order('total_count', { ascending: false })

		if (error) throw error

		return json({ stats: stats || [] })
	} catch (error) {
		console.error('Stats error:', error)
		return json({ error: error.message }, { status: 500 })
	}
}