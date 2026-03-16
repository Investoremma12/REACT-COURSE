import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

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
		const time = dayjs().valueOf();
		setIsLoading(true);
		const newChatMessages = [
			...chatMessages,
			{
				message: inputText,
				sender: 'user',
				id: crypto.randomUUID(),
				chatTime: dayjs(time).format('h:mma'),
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
				chatTime: dayjs(time).format('h:mma'),
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
					chatTime: dayjs(time).format('h:mma'),
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

	function removeMessage() {
		setChatMessages([]);

		localStorage.setItem('messages', JSON.stringify([]));
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
			<button onClick={removeMessage} className="clear-button">
				Clear
			</button>
		</div>
	);
}
