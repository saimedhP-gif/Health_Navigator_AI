import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { medications, leafName, leafCompounds } = await req.json();

    console.log(`Checking drug interactions for ${leafName} with medications:`, medications);

    if (!medications || !Array.isArray(medications) || medications.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide at least one medication' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!leafName) {
      return new Response(
        JSON.stringify({ error: 'Please provide a medicinal leaf name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a pharmaceutical safety expert specializing in herb-drug interactions. Your role is to identify potential interactions between medicinal plants and conventional medications.

CRITICAL RULES:
1. Always err on the side of caution
2. Never dismiss potential interactions
3. Always recommend consulting a healthcare provider
4. Focus on well-documented interactions from scientific literature
5. Use clear, non-technical language

Respond in JSON format with this structure:
{
  "hasInteractions": boolean,
  "riskLevel": "low" | "moderate" | "high" | "unknown",
  "interactions": [
    {
      "medication": "medication name",
      "severity": "mild" | "moderate" | "severe" | "contraindicated",
      "description": "Brief description of the interaction",
      "mechanism": "How the interaction occurs",
      "recommendation": "What to do"
    }
  ],
  "generalWarning": "Overall safety message",
  "disclaimer": "Medical disclaimer"
}`;

    const userPrompt = `Check for potential drug interactions between the medicinal plant "${leafName}" (containing compounds: ${leafCompounds?.join(', ') || 'various bioactive compounds'}) and these medications: ${medications.join(', ')}.

Analyze each medication for:
1. Direct pharmacological interactions
2. Metabolism interference (CYP450 enzymes)
3. Additive or synergistic effects
4. Absorption interference

Be thorough but use plain language.`;

    const response = await fetch('https://api.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze interactions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in response');
      return new Response(
        JSON.stringify({ error: 'No analysis generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON from the response
    let result;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      result = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw content:', content);
      // Return a safe fallback
      result = {
        hasInteractions: true,
        riskLevel: "unknown",
        interactions: [],
        generalWarning: "Unable to fully analyze interactions. Please consult a healthcare provider before combining this medicinal plant with any medications.",
        disclaimer: "This information is for educational purposes only and should not replace professional medical advice."
      };
    }

    console.log('Interaction check completed successfully');

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in check-drug-interactions:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
