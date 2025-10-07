import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const ASSISTANT_ID = process.env.ASSISTANT_ID || 'asst_Roo0D8nWTgXAaP7TPUjE63yo'
