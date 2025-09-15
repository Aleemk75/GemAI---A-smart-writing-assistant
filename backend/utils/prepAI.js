import "dotenv/config";

export async function getGemeniResponse(prompt) {

 const API_KEY = process.env.GEMINI_API_KEY; 
  if (!API_KEY) {
    console.error('API key not found. Please set the GEMINI_API_KEY environment variable.');
    return;
  }

  // The endpoint for the Gemini API.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // The data payload for the POST request.
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt,
          }
        ]
      }
    ]
  };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }

       try {
        const response = await fetch(url, options);
        // Parse the JSON response to js object;
        const data = await response.json();

        const generatedText = data.candidates[0].content.parts[0].text;
        // console.log(generatedText);
        return generatedText;

    } catch (error) {
        console.log(error);
        
    }

}