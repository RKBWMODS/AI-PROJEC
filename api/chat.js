export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` 
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'DIZ FLYZE AI' },
            { role: 'user', content: message }
          ]
        })
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ response: data.error.message });
      }
      const aiResponse = data.choices[0].message.content;
      res.status(200).json({ response: aiResponse });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ response: "Terjadi kesalahan." });
    }
  } else {
    res.status(405).json({ response: "Method not allowed." });
  }
}
