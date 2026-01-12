
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function generateSOPContent(title: string, purpose: string, rawSteps: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are an expert Enterprise Operations Consultant.
    Create a professional Standard Operating Procedure (SOP) based on the following:

    Title: ${title}
    Purpose: ${purpose}
    Rough Steps: ${rawSteps}

    Format the output as a JSON object with the following structure:
    {
        "title": "Refined Title",
        "purpose": "Professional intent statement",
        "audience": "Target audience inference",
        "steps": ["Step 1...", "Step 2..."],
        "compliance": ["Compliance check 1", "Compliance check 2"]
    }
    Ensure the tone is professional, clear, and directive.
    Output ONLY valid JSON. Do not use markdown code blocks.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw new Error("Failed to generate SOP content.");
    }
}
