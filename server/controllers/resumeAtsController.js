exports.analyzeResumeATS = async (req, res) => {
  try {
    const email = req.payload;
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json("Resume text missing");
    }

    const systemPrompt = `
You are an ATS resume analyzer.

RULES:
- Return ONLY valid JSON
- No markdown
- No explanation
- Scores must be numbers
- Suggestions must be short and actionable

FORMAT:
{
  "atsScore": 0,
  "summary": "",
  "missingKeywords": [],
  "improvements": [],
  "optimizedSummary": ""
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nRESUME TEXT:\n"""${resumeText}"""`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const jsonMatch = aiText?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json("Invalid AI response");
    }

    const atsResult = JSON.parse(jsonMatch[0]);

    res.status(200).json(atsResult);
  } catch (error) {
    console.error("ATS analysis error:", error);
    res.status(500).json("ATS analysis failed");
  }
};



