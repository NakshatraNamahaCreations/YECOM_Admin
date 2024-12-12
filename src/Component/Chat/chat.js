import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import "./chat.css";

const socket = io("http://localhost:3000");

function Chat({ userId, selectedChat }) {
  // const userId = "662c932f56fb50dc2ebd8019";
  // const selectedChat = {
  //   userId: "662c932f56fb50dc2ebd8019",
  //   chat: "Hello, this is a test message",
  //   receiverId: "662cad287e5987d40f85b852",
  // };

  const [messages, setMessages] = useState(selectedChat.conversationList || []);
  const [typeMessage, setTypeMessage] = useState("");
  console.log("messages", messages);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (typeMessage.trim()) {
      const newMessage = {
        userId,
        chat: typeMessage,
        receiverId: selectedChat._id,
      };

      socket.emit("sendMessage", newMessage);
      setTypeMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === userId ? "sent" : "received"
            }`}
          >
            <span>{msg.chat}</span>
            <span className="timestamp">
              {moment(msg.timestamp).format("LT")}
            </span>
          </div>
        ))}
      </div>
      <div className="input-container111">
        <textarea
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
          placeholder="Write something here …"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
