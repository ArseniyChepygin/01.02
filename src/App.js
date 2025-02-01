import React, { useState } from "react";

// Initialize OpenAI (your OpenAI setup will remain the same)
import OpenAI from "openai"; 

const openai = new OpenAI({
  apiKey: "your-api-key-here", // Replace with your OpenAI API key
  dangerouslyAllowBrowser: true, // Allow usage in the browser (unsafe for production)
});

async function generateText(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // GPT model to use
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating text:", error);
    return "Error: Unable to generate text.";
  }
}

function App() {
  const [prompt, setPrompt] = useState(""); // Track user input
  const [response, setResponse] = useState(""); // Track the response from OpenAI
  const [loading, setLoading] = useState(false); // Track if the app is generating text

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const aiResponse = await generateText(prompt);
    setResponse(aiResponse);
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333" }}>AI Text Generator</h1>
      <textarea
        style={{
          width: "80%",
          height: "100px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <p><strong>AI Response:</strong> {response}</p>
    </div>
  );
}

export default App;