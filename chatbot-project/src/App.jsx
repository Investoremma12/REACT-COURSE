import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css';

function App() {
	const [chatMessages, setChatMessages] = useState(
		JSON.parse(localStorage.getItem('messages')) || [],
	);
	// const [chatMessages, setChatMessages] = array;
	// const chatMessages = array[0];

	// const setChatMessages = array[1];
	useEffect(() => {
		localStorage.setItem('messages', JSON.stringify(chatMessages));
	}, [chatMessages]);
	useEffect(() => {
		Chatbot.addResponses({
			'what is dropshipping':
				'dropshipping can be defined as an online way of deliverying goods and services to people fast and easily without any stress ',
		});
	});

	return (
		<div className="app-container">
			<ChatMessages chatMessages={chatMessages} />
			<ChatInput
				chatMessages={chatMessages}
				setChatMessages={setChatMessages}
			/>
		</div>
	);
}

export default App;
