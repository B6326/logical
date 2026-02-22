import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function POST({ request }) {
	try {
		const { sessionId, message } = await request.json()

		if (!sessionId || !message) {
			return json({ error: 'sessionId and message are required' }, { status: 400 })
		}

		// 1. 사용자 메시지 저장
		const { data: userMsg, error: userError } = await supabase
			.from('conversation_messages')
			.insert({
				session_id: sessionId,
				sender_type: 'user',
				message_text: message
			})
			.select()
			.single()

		if (userError) throw userError

		// 2. 임시 AI 응답 (나중에 실제 AI로 교체)
		const aiResponse = `[임시 응답] 당신의 메시지를 받았습니다: "${message}". AI 연동은 곧 추가됩니다.`

		// 3. AI 응답 저장
		const { data: aiMsg, error: aiError } = await supabase
			.from('conversation_messages')
			.insert({
				session_id: sessionId,
				sender_type: 'ai',
				message_text: aiResponse
			})
			.select()
			.single()

		if (aiError) throw aiError

		return json({
			userMessage: userMsg,
			aiMessage: aiMsg
		})
	} catch (error) {
		console.error('Chat error:', error)
		return json({ error: error.message }, { status: 500 })
	}
}