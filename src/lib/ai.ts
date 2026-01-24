const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error('❌ VITE_GEMINI_API_KEY is not defined in environment variables!');
    throw new Error('API key is required');
}

export async function generateSOPContent(title: string, purpose: string, rawSteps: string) {
    try {
        console.log('🚀 Starting AI generation with:', { title, purpose, hasSteps: !!rawSteps });

        const prompt = `You are a Senior Enterprise Operations Consultant with 15+ years of experience creating professional Standard Operating Procedures for Fortune 500 companies.

Create a HIGHLY PROFESSIONAL, ENTERPRISE-GRADE Standard Operating Procedure document.

INPUT REQUIREMENTS:
${rawSteps}

OUTPUT REQUIREMENTS:
Return ONLY valid JSON (no markdown, no code blocks, no explanations). The JSON must have this exact structure:

{
    "title": "Professional, action-oriented title",
    "purpose": "Clear, compelling purpose statement (2-3 sentences)",
    "scope": "Detailed scope covering what IS and ISN'T included",
    "audience": "Specific roles and teams who will use this SOP",
    "steps": [
        "STEP 1: [Action Verb] - [Clear instruction with specific details]",
        "STEP 2: [Action Verb] - [Include tools, timelines, responsible parties]",
        "... 5-10 detailed, actionable steps"
    ],
    "compliance": ["[Specific compliance requirement]"],
    "responsibleParties": [{"role": "Role Name", "responsibilities": ["Duty 1"], "authority": "Decision-making power"}],
    "toolsRequired": [{"name": "Tool Name", "purpose": "Why needed", "accessLevel": "Who needs it"}],
    "qualityChecks": ["Checkpoint 1", "Checkpoint 2"],
    "kpis": [{"metric": "KPI Name", "target": "Target value", "measurement": "How to measure"}],
    "commonErrors": [{"error": "Mistake", "consequences": "Impact", "prevention": "How to prevent", "resolution": "How to fix"}],
    "revisionHistory": {"version": "1.0", "date": "${new Date().toISOString().split('T')[0]}", "author": "AI SOP Generator", "changes": "Initial creation"},
    "approvalChain": ["Role 1", "Role 2"],
    "relatedDocuments": ["Document 1"],
    "appendix": {"definitions": {}, "templates": [], "contacts": []}
}

Return ONLY the JSON object. No markdown formatting, no code blocks, no explanations.`;

        console.log('📡 Calling Gemini API via REST...');

        // Use direct REST API with v1beta endpoint (Gemini requires v1beta)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ AI Response received');

        // Extract text from response
        const text = data.candidates[0].content.parts[0].text.trim();
        console.log('Response length:', text.length);

        // Clean up any markdown formatting
        const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

        try {
            const parsed = JSON.parse(cleanText);
            console.log('✅ JSON parsed successfully');
            return parsed;
        } catch (parseError) {
            console.error('❌ Failed to parse AI response:', parseError);
            console.error('Raw response:', cleanText.substring(0, 500));

            // Return fallback structure
            console.log('⚠️ Using fallback SOP structure');
            return {
                title,
                purpose,
                scope: "This SOP covers the complete workflow and procedures required.",
                audience: "All relevant team members and stakeholders",
                steps: rawSteps.split('\n').filter(s => s.trim()).map((step, idx) =>
                    `STEP ${idx + 1}: ${step.trim()}`
                ),
                compliance: ["Ensure all actions comply with company policies"],
                responsibleParties: [{ role: "Team Lead", responsibilities: ["Oversee execution"], authority: "Approve exceptions" }],
                toolsRequired: [{ name: "Standard tools", purpose: "Process execution", accessLevel: "Team members" }],
                qualityChecks: ["Review outputs", "Verify compliance", "Document completion"],
                kpis: [{ metric: "Completion Rate", target: "95%", measurement: "Monthly tracking" }],
                commonErrors: [{ error: "Missing docs", consequences: "Incomplete trail", prevention: "Use checklists", resolution: "Backfill" }],
                revisionHistory: { version: "1.0", date: new Date().toISOString().split('T')[0], author: "AI SOP Generator", changes: "Initial creation" },
                approvalChain: ["Team Lead", "Manager"],
                relatedDocuments: ["Company policies"],
                appendix: { definitions: {}, templates: [], contacts: [] }
            };
        }
    } catch (error: any) {
        console.error('❌ AI Generation Error:', error);
        throw new Error(`AI Generation failed: ${error.message || 'Unknown error'}`);
    }
}

// Generate Marketing Funnel with AI
export async function generateMarketingFunnel(
    funnelType: string,
    industry: string,
    goal: string,
    answers: any,
    templateStages: any[]
) {
    try {
        console.log('🎯 Starting Marketing Funnel generation...', { funnelType, industry, goal });

        const prompt = `You are a Senior Growth Strategist and Funnel Architect with 15+ years of experience creating high-converting marketing funnels for Fortune 500 companies and unicorn startups.

Create a COMPREHENSIVE, PROFESSIONAL marketing funnel strategy document.

CONTEXT:
- Funnel Type: ${funnelType}
- Industry: ${industry}
- Primary Goal: ${goal}
- Target Customer: ${answers.targetCustomer}
- Price Range: ${answers.priceRange}
- Sales Cycle: ${answers.salesCycle}
- Traffic Source: ${answers.trafficSource}
- Business Stage: ${answers.businessStage}

FUNNEL STAGES TO DETAIL:
${templateStages.map((stage, idx) => `${idx + 1}. ${stage.label}: ${stage.objective}`).join('\n')}

OUTPUT REQUIREMENTS:
Return ONLY valid JSON (no markdown, no code blocks). The JSON must have this exact structure:

{
    "funnelOverview": {
        "type": "${funnelType}",
        "industry": "${industry}",
        "goal": "${goal}",
        "targetAudience": "Detailed description of ideal customer",
        "valueProposition": "Clear value proposition statement",
        "estimatedTimeline": "Expected time to see results",
        "budgetGuidance": "Recommended budget range"
    },
    "stages": [
        {
            "name": "stage-name",
            "label": "Stage Label",
            "objective": "Clear objective",
            "tactics": ["Specific tactic 1", "Specific tactic 2", "... 5-8 tactics"],
            "channels": ["Platform 1", "Platform 2"],
            "contentTypes": ["Content type 1", "Content type 2"],
            "budget": "Budget allocation %",
            "timeline": "Implementation timeline",
            "kpis": ["KPI 1", "KPI 2"],
            "optimizationTips": ["Optimization tip 1", "Optimization tip 2"],
            "commonMistakes": ["Mistake 1", "Mistake 2"]
        }
    ],
    "channelStrategy": {
        "paid": {
            "primary": ["Primary paid channel 1", "Primary paid channel 2"],
            "secondary": ["Secondary channel 1"],
            "budget": "Budget split recommendation",
            "targeting": "Detailed targeting strategy",
            "adFormats": ["Ad format 1", "Ad format 2"]
        },
        "organic": {
            "channels": ["Organic channel 1", "Organic channel 2"],
            "focusAreas": ["Focus area 1", "Focus area 2"],
            "contentPillars": ["Pillar 1", "Pillar 2"]
        },
        "retargeting": {
            "platforms": ["Platform 1", "Platform 2"],
            "audiences": ["Audience segment 1", "Audience segment 2"],
            "strategy": "Retargeting approach and sequence",
            "budget": "Retargeting budget %"
        }
    },
    "conversionOptimization": {
        "dropOffPoints": [
            {"stage": "Stage name", "issue": "Common issue", "solution": "Specific solution"}
        ],
        "abTests": ["Test idea 1 with hypothesis", "Test idea 2 with hypothesis"],
        "improvementChecklist": ["Action item 1", "Action item 2", "... 8-10 items"],
        "quickWins": ["Quick win 1", "Quick win 2"]
    },
    "toolsStack": {
        "ads": ["Tool 1 - use case", "Tool 2 - use case"],
        "crm": ["CRM tool - use case"],
        "analytics": ["Analytics tool 1", "Analytics tool 2"],
        "automation": ["Automation tool 1", "Automation tool 2"],
        "landingPages": ["LP tool - use case"],
        "email": ["Email tool - use case"]
    },
    "kpisMetrics": {
        "primary": [
            {"metric": "Metric name", "target": "Specific target", "measurement": "How to measure", "importance": "Why it matters"}
        ],
        "secondary": [
            {"metric": "Metric name", "target": "Target", "benchmark": "Industry benchmark"}
        ],
        "funnelHealth": ["Health indicator 1", "Health indicator 2"],
        "dashboardRecommendation": "Dashboard setup guidance"
    },
    "implementationRoadmap": {
        "month1": {
            "title": "Month 1: Foundation & Launch",
            "focus": "Primary focus of the month",
            "weeks": [
                {"week": "Week 1-2", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]},
                {"week": "Week 3-4", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]}
            ],
            "kpis": ["KPI 1", "KPI 2"]
        },
        "month2": {
            "title": "Month 2: Optimization & Scale",
            "focus": "Primary focus of the month",
            "weeks": [
                {"week": "Week 5-6", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]},
                {"week": "Week 7-8", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]}
            ],
            "kpis": ["KPI 1", "KPI 2"]
        },
        "month3": {
            "title": "Month 3: Expansion & Authority",
            "focus": "Primary focus of the month",
            "weeks": [
                {"week": "Week 9-10", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]},
                {"week": "Week 11-12", "actions": ["Detailed action 1", "Detailed action 2"], "tools": ["Tool 1", "Tool 2"]}
            ],
            "kpis": ["KPI 1", "KPI 2"]
        }
    },
    "competitiveAdvantage": {
        "differentiators": ["Differentiator 1", "Differentiator 2"],
        "positioning": "Market positioning strategy",
        "messagingFramework": "Key messaging approach"
    }
}

IMPORTANT GUIDELINES:
- Be EXTREMELY specific and actionable
- Use ${industry} industry terminology
- Reference real platforms and tools (Meta Ads, Google Analytics, HubSpot, etc.)
- Provide actual targeting criteria, not generic advice
- Include realistic budget percentages
- Make tactics copy-paste ready
- Use professional business language suitable for client presentations
- All recommendations must be implementable TODAY

Return ONLY the JSON object. No explanations, no markdown formatting.`;

        console.log('📡 Calling Gemini API for funnel generation...');

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text.trim();
        console.log('✅ Funnel generation response received, length:', text.length);

        // Clean up markdown formatting
        const cleanText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

        try {
            const parsed = JSON.parse(cleanText);
            console.log('✅ Funnel JSON parsed successfully');
            return parsed;
        } catch (parseError) {
            console.error('❌ Failed to parse funnel response:', parseError);
            console.error('Raw response:', cleanText.substring(0, 500));
            throw new Error('AI generated invalid funnel format');
        }
    } catch (error: any) {
        console.error('❌ Funnel Generation Error:', error);
        throw new Error(`Funnel generation failed: ${error.message || 'Unknown error'}`);
    }
}
