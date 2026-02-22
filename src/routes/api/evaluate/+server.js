import { json } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'

export async function POST({ request }) {
	try {
		const { sessionId } = await request.json()

		if (!sessionId) {
			return json({ error: 'sessionId is required' }, { status: 400 })
		}

		// 1. 전체 대화 조회
		const { data: messages, error: fetchError } = await supabase
			.from('conversation_messages')
			.select('*')
			.eq('session_id', sessionId)
			.order('created_at', { ascending: true })

		if (fetchError) throw fetchError

		if (!messages || messages.length === 0) {
			return json({ error: 'No messages found' }, { status: 400 })
		}

		// 2. 임시 점수 (나중에 실제 AI 분석으로 교체)
		const scores = {
			structuralDeduction: 75,
			probabilisticInduction: 80,
			fallacyDetection: 70,
			causalAbduction: 85,
			analogicalMapping: 72,
			dialecticalSynthesis: 78,
			overall: 77
		}

		// 3. 결과 저장
		const { data: assessment, error: insertError } = await supabase
			.from('logic_assessments')
			.insert({
				session_id: sessionId,
				structural_deduction_score: scores.structuralDeduction,
				probabilistic_induction_score: scores.probabilisticInduction,
				fallacy_detection_score: scores.fallacyDetection,
				causal_abduction_score: scores.causalAbduction,
				analogical_mapping_score: scores.analogicalMapping,
				dialectical_synthesis_score: scores.dialecticalSynthesis,
				overall_score: scores.overall
			})
			.select()
			.single()

		if (insertError) throw insertError

		// 4. 세션 완료 처리
		await supabase
			.from('test_sessions')
			.update({
				status: 'completed',
				completed_at: new Date().toISOString()
			})
			.eq('session_id', sessionId)

		return json({ assessment })
	} catch (error) {
		console.error('Evaluation error:', error)
		return json({ error: error.message }, { status: 500 })
	}
}