import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';
import dayjs from 'dayjs';
import LoadingSpinnerImage from '../assets/loading-spinner.gif';

type ChatInputProps = {
	chatMessages: {
		id: string;
		message: string | React.ReactNode;
		sender: string;
		chatTime: string;
	}[];
	setChatMessages: (
		chatMessages: {
			id: string;
			message: string | React.ReactNode;
			sender: string;
			chatTime: string;
		}[],
	) => void;
};

type ChangeEventProps = {
	target: {
		value: string;
	};
};

type KeyEventProps = {
	key: string;
};
export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
	const [inputText, setInputText] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function saveInputText(event: ChangeEventProps) {
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

	function saveEnterMessages(event: KeyEventProps) {
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
				size={30}
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
