import React, { useState } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa"; // Import a robot icon from React Icons (optional)

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to manage chatbot visibility

  // List of keywords relevant to your website (solar power-related)
  const keywords = [
    "e-waste",
    "recycling",
    "upcycling",
    "disposal",
    "recovery",
    "sustainability",
    "toxic materials",
    "electronic devices",
    "pollution",
    "waste management",
    "reuse",
    "circular economy",
    "environmental impact",
    "resource conservation",
    "e-waste regulations",
    "hazardous waste",
    "e-waste collection",
    "data security",
    "green technology",
    "carbon footprint",
    "eco-friendly",
  ];

  // Function to check if a keyword exists (case-insensitive)
  function containsKeyword(input) {
    const lowerInput = input.toLowerCase();
    return keywords.some(keyword => keyword.toLowerCase() === lowerInput);
  }

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    const isRelated = keywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );

    if (isRelated) {
      const aiResponse = await getAIResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: aiResponse },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, I can only answer questions related to E-Waste and our website!",
        },
      ]);
    }

    setInput("");
  };

  const getAIResponse = async (userMessage) => {
    // Check if the user is asking for a response in Hindi or another language
    let language = "English";
    if (userMessage.toLowerCase().includes("hindi")) {
      language = "Hindi";
    }
    // Customizing prompt to handle other languages
    const prompt = `You are a chatbot on an E-Waste Trade Hub website. Respond in ${language} language and answer questions related to E-Waste, installation, maintenance, costs, savings, environmental benefits, or the products and services offered on the website. 
    User: ${userMessage}`;

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for API key
          },
        }
      );
      return res.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error fetching AI response", error);
      return "Sorry, I can't assist with that right now.";
    }
  };

  return (
    <div>
      {/* Chatbot icon button for mobile view */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-10 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg z-50"
        aria-label="Chat with us"
      >
        <FaRobot size={24} /> {/* Robot icon from React Icons */}
      </button>

      {/* Chatbot container */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-72 bg-white shadow-lg rounded-lg flex flex-col z-50">
          <div className="p-4 bg-blue-500 text-white rounded-t-lg">
            <h3 className="text-lg font-bold">E-Waste Trade Hub Chatbot</h3>
          </div>
          <div
            className="p-4 flex-grow overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-300 text-black"
                    }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-0 border border-gray-300 rounded-l-lg focus:outline-none"
              placeholder="  Ask about E-Waste..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white p-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
