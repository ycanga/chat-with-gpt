import React, { useState, useEffect, useRef } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "boxicons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Chat.css";
import axios from "axios";
import { ApiKey, ApiUrl, AiModel } from "../config";

export default function ChatButton() {
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [modalClass, setModalClass] = useState("");

  const handleShow = () => {
    setShowModal(true);
    setModalClass("modal-show");
  };
  const handleClose = () => {
    setModalClass("modal-hide");
    setTimeout(() => setShowModal(false), 300);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      setLoading(true);

      let data = JSON.stringify({
        model: AiModel,
        messages: [
          {
            role: "user",
            content: newMessage,
          },
        ],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: ApiUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer "+ApiKey,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const botMessage = {
            text: response.data.choices[0].message.content,
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      {showModal ? (
        <button className="btn btn-warning fixed-button" onClick={handleClose}>
          <box-icon name="x" size="lg"></box-icon>
        </button>
      ) : (
        <button className="btn btn-warning fixed-button" onClick={handleShow}>
          <box-icon
            type="solid"
            name="message-square-dots"
            size="lg"
            animation="tada"
          ></box-icon>
        </button>
      )}

      <div
        className={`custom-modal ${showModal ? modalClass : "d-none"}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3 bg-warning rounded">
            <div className="modal-header">
              <h5 className="modal-title">
                ChatGPT{" "}
                <box-icon
                  type="solid"
                  name="circle"
                  size="xs"
                  animation="flashing"
                  color="#33ce33"
                ></box-icon>
              </h5>
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={handleClose}
              >
                <box-icon
                  name="x-circle"
                  type="solid"
                  background-color="transparent"
                ></box-icon>
              </button>
            </div>
            <div className="modal-body mt-2">
              <div className="chat-container p-4 bg-white">
                <div className="row">
                  <div className="message bot shadow">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/022/739/948/original/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg"
                      alt="bot avatar"
                      className="avatar"
                    />
                    <div className="message-content">
                      Hello! How can I help you today?
                    </div>
                  </div>
                </div>
                {messages.map((message, index) =>
                  message.sender === "user" ? (
                    <div className="row justify-content-end" key={index}>
                      <div className="message user shadow">
                        <img
                          src="https://i0.wp.com/static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg?ssl=1"
                          alt="user avatar"
                          className="avatar"
                        />
                        <div className="message-content">{message.text}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="row" key={index}>
                      <div className="message bot shadow">
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/022/739/948/original/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg"
                          alt="bot avatar"
                          className="avatar"
                        />
                        <div className="message-content">{message.text}</div>
                      </div>
                    </div>
                  )
                )}
                {loading && (
                  <div className="row">
                    <div className="message bot shadow">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/022/739/948/original/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg"
                        alt="bot avatar"
                        className="avatar"
                      />
                      <div className="message-content">Typing...</div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="row align-items-center mt-3">
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control border-2"
                    placeholder="Type here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                <div className="col-1">
                  <button
                    type="button"
                    className="btn btn-transparent btn-sm"
                    onClick={handleSend}
                  >
                    <box-icon name="send" className="p-3"></box-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
