import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user-face-profile.jpg';
import './ChatMessage.css';

export function ChatMessage({ message, sender, time }) {
	// const { message, sender } = props;

	/*if (sender === 'robot') {
                    return (
                        <div>
                            <img src="robot.png" width="50px" />
                            {message}
                        </div>
                    );
                }*/

	return (
		<div
			className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
		>
			{sender === 'robot' && (
				<img src={RobotProfileImage} className="chat-message-profile" />
			)}
			<div className="chat-message-text">
				<div>{message}</div>
				<div className="chat-message-time">{time}</div>
			</div>

			{sender === 'user' && (
				<img
					src={UserProfileImage}
					className="chat-message-profile chat-user-profile"
				/>
			)}
		</div>
	);
}
