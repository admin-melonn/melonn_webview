import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
})

export const chatComplete = async (SystemPrompt: string, prompt: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: SystemPrompt,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
}
