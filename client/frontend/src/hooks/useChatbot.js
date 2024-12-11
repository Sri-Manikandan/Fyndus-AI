import { useState } from "react";
import { chatbotService } from "../utils/chatbotService";

export const useChatbot = (setResponse, setIsChatbotReady) => {
	const initChatbot = async () => {
		try {
			await chatbotService.init();
			setIsChatbotReady(true);
			return true;
		} catch (error) {
			setError(error);
			setIsChatbotReady(false);
			return false;
		}
	};

	const sendMessage = async (message) => {
		console.log("Sending message: ", message);
		const response = await chatbotService.sendMessage(message);
		setResponse(response);
	};

	const [error, setError] = useState(null);

	return {
		initChatbot,
		sendMessage,
		error,
	};
};
