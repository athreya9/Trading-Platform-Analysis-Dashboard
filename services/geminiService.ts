
import { GoogleGenAI, Type } from "@google/genai";
import type { AiSignalData } from '../types';

// FIX: Per guidelines, initialize directly with process.env.API_KEY and assume it is configured.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        marketOutlook: {
            type: Type.STRING,
            description: "A brief, one-word summary of the market sentiment (e.g., Bullish, Bearish, Neutral)."
        },
        outlookReason: {
            type: Type.STRING,
            description: "A concise sentence explaining the reason for the current market outlook."
        },
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A short title for the recommended action."
                    },
                    action: {
                        type: Type.STRING,
                        description: "A specific, actionable trading recommendation based on technical or market indicators."
                    }
                },
                required: ["title", "action"]
            },
            description: "An array of two distinct trading recommendations."
        }
    },
    required: ["marketOutlook", "outlookReason", "recommendations"]
};


export const fetchTradingSignals = async (): Promise<AiSignalData> => {
  try {
    const prompt = `
      Act as an expert financial analyst for a high-frequency trading bot. 
      Analyze the current (fictional) market conditions for major tech stocks like AAPL, GOOGL, and MSFT.
      Provide a clear, concise market outlook and two distinct, actionable trading recommendations.
      The recommendations should be based on common technical indicators like RSI, MACD, or moving averages.
      Return the response strictly as a JSON object matching the provided schema.
    `;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7
        }
    });

    const jsonString = response.text.trim();
    const parsedData: AiSignalData = JSON.parse(jsonString);
    return parsedData;

  } catch (error) {
    console.error("Error fetching trading signals from Gemini API:", error);
    throw new Error("Failed to generate AI trading signals. Please check the API configuration and try again.");
  }
};
