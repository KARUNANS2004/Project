import axios from "axios";
import { useState } from "react";

export default function Query() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleQuery = async () => {
    if (!query) return;

    const userMsg = { type: "user", text: query };

    const res = await axios.post("http://localhost:5000/api/query", {
      query,
    });

    const botMsg = {
      type: "bot",
      text: JSON.stringify(res.data.result),
    };

    setMessages([...messages, userMsg, botMsg]);
    setQuery("");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">
        🤖 Ask Your Bills
      </h2>

      {/* Chat box */}
      <div className="h-64 overflow-y-auto mb-4 space-y-2 text-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.type === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-2 rounded-lg text-white"
        />

        <button onClick={handleQuery} className="bg-green-600 px-4 rounded-lg">
          Ask
        </button>
      </div>
    </div>
  );
}
