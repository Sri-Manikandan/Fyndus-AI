import { useState } from "react";
import UserInput from "./UserInput";
import Output from "./Output";

function SubInterview() {
  const [response, setResponse] = useState({
    response: "Hello, thank you for having me here today. I'm excited to learn more about this opportunity.",
  });

  const [isChatbotReady, setIsChatbotReady] = useState(false);

  return (
    <div
      className="main-container bg-lightblue min-h-screen flex flex-col items-center justify-center p-6"
      data-chatbot-ready={isChatbotReady}
    >
      {/* Output Section */}
      <div className="output-container w-full max-w-xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <Output response={response} />
      </div>

      {/* User Input Section */}
      <div className="w-full max-w-xl mt-8 mb-20">
        <UserInput setResponse={setResponse} isChatbotReady={isChatbotReady} setIsChatbotReady={setIsChatbotReady} />
      </div>
    </div>
  );
}

export default SubInterview;
