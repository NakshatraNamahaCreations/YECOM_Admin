import React, { useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import axios from "axios";

const Chat = ({ groupId, userId }) => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket == null) return;

    // Join the group room
    socket.emit("joinGroup", groupId);

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, groupId]);

  useEffect(() => {
    // Fetch existing messages for the group
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/groups/${groupId}/messages`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [groupId]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      groupId,
      senderId: userId,
      text: message,
      createdAt: new Date().toISOString(),
    };
    socket.emit("sendMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender.username}</b>: {msg.text} <br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
