import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
})

export const chatComplete = async (
  SystemPrompt: string,
  prompt: string,
  convs?: any[]
) => {
  const conversations = () => {
    if (convs) return convs
    else return []
  }
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: SystemPrompt,
      },
      ...conversations(),
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
}
