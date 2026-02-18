import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
	function useAutoScroll(chatMessages) {
		const chatMesssagesRef = useRef(null);

		useEffect(() => {
			const containerElem = chatMesssagesRef.current;

			if (containerElem) {
				containerElem.scrollTop = containerElem.scrollHeight;
			}
		}, [chatMessages]);

		return chatMesssagesRef;
	}
	return (
		<div className="chat-messeges-container" ref={useAutoScroll(chatMessages)}>
			{chatMessages.length === 0 && (
				<p className="welcome-text">
					Welcome to the chatbot project! send a message using the textbox
					below.
				</p>
			)}
			{chatMessages.map((chatMessage) => {
				return (
					<>
						<ChatMessage
							message={chatMessage.message}
							sender={chatMessage.sender}
							key={chatMessage.id}
						/>
					</>
				);
			})}
		</div>
	);
}

export default ChatMessages;
