import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	function saveInputText(event) {
		setInputText(event.target.value);
	}
	async function sendMessage() {
		if (inputText.trim() === '' || isLoading) {
			return;
		}

		setIsLoading(true);
		const newChatMessages = [
			...chatMessages,
			{
				message: inputText,
				sender: 'user',
				id: crypto.randomUUID(),
			},
		];
		setChatMessages(newChatMessages);
		setInputText('');

		setChatMessages([
			...newChatMessages,
			{
				message: <img className="loading-image" src={LoadingSpinnerImage} />,
				sender: 'robot',
				id: crypto.randomUUID(),
			},
		]);
		try {
			const response = await Chatbot.getResponseAsync(inputText);

			setChatMessages([
				...newChatMessages,
				{
					message: response,
					sender: 'robot',
					id: crypto.randomUUID(),
				},
			]);
		} finally {
			setIsLoading(false);
		}
	}

	function saveEnterMessages(event) {
		if (event.key === 'Enter') {
			sendMessage();
		} else if (event.key === 'Escape') {
			setInputText('');
		}
	}

	return (
		<div className="chat-input-container">
			<input
				placeholder="Send a message to Chatbot"
				size="30"
				onChange={saveInputText}
				value={inputText}
				onKeyDown={saveEnterMessages}
				className="chat-input"
			/>
			<button onClick={sendMessage} className="send-button">
				Send
			</button>
		</div>
	);
}
