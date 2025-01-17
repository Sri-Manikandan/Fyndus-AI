import { io } from "socket.io-client";

class ChatbotService {
	constructor() {
		this.socket = io("http://localhost:3000/");
	}

	async init() {
		let round = localStorage.getItem("round");
		const name = localStorage.getItem('name')

		this.socket.emit("init", {round,name});

		let response = await new Promise((resolve, reject) => {
			this.socket.on("responseInit", (response) => {
				if (response) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});

		return response;
	}

	async sendMessage(message) {
		const StartTime = localStorage.getItem('questionStartTime');
		const interviewStartTime = localStorage.getItem('interviewStartTime');
		const name = localStorage.getItem('name')
		let duration=0;
		let interviewDuration = 0;
		if (StartTime) {
			duration = (Date.now()-StartTime)/1000;
			console.log('response duration:', duration);
			localStorage.removeItem('questionStartTime');
		}
		if(interviewStartTime)
		{
			interviewDuration = (Date.now()-interviewStartTime)/1000;
			console.log('response duration:', interviewDuration);
		}
		

		this.socket.emit("message", { question: message,duration,interviewStartTime,name });

		let response = await new Promise((resolve, reject) => {
			this.socket.on("responseMessage", (response) => {
				if (response) {
					resolve(response);
				} else {
					reject(response);
				}
			});
		});

		return response;
	}
}

export const chatbotService = new ChatbotService();
