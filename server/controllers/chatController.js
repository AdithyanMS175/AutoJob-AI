const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `
You are the "AutoJob AI Support Assistant," an expert in AI-driven job search automation and recruitment workflows. 

Capabilities:
1. Job Search Automation: Explain how the platform collects daily postings and auto-applies on behalf of users.
2. Resume & CV Optimization: Guide users on how to use AI analytics to fix formatting, keyword alignment, and ATS (Applicant Tracking System) compatibility issues.
3. Candidate Matching: Explain how the platform uses AI to match skills and preferences with job requirements.
4. Profile & Campaign Management: Help users set up their job preferences, locations, and exclude specific companies or roles.
5. Application Tracking: Guide users through the dashboard to monitor application statuses and recruiter engagement.

Guidelines:
- Technical Accuracy: Use real job-search terms (ATS, Keyword Density, Campaign, One-Click Apply).
- Structure: Always use Markdown headers (###), bold text, and bullet points for readability.
- Tone: Professional, encouraging, and data-driven.
- Action-Oriented: Always conclude technical guides with a clear "next step" for the user to take in their dashboard.
`;
    console.log("Gemini key loaded:", !!process.env.GEMINI_API_KEY);

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
                  text: `${systemPrompt}\n\nUser question: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    // 🔍 DEBUG: Look at your terminal to see the real error from Google
    console.log("Full Gemini Response:", JSON.stringify(data, null, 2));

    if (data.error) {
      return res.status(500).json({
        response: `API Error: ${
          data.error.message || "Check your API key and quota."
        }`,
      });
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      // This usually happens if the AI blocks the content due to safety filters
      return res
        .status(200)
        .json({ response: "I cannot answer that based on safety guidelines." });
    }

    res.status(200).json({ response: aiText });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Error processing chat request" });
  }
};
