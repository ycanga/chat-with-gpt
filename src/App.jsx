import React from "react";
import ChatButton from "./chat/ChatButton";

export default function App() {
  return (
    <>
      <div className="container">
        <h1 className="mt-5 mb-5">ChatGPT React Chatbot </h1>
        <p>
          Using this project, you can use ChatGPT as a simple ChatBot by
          integrating it into your website.
        </p>
        <p>
          Before using the project you need to get the API Key required by
          OpenAI. You can use the project by defining the API Key information
          you received in the “config.js” file.
        </p>
        <p>
          <b className="text-success">ChatGPT API</b>,{" "}
          <b className="text-success">React</b>,{" "}
          <b className="text-success">Axios</b>,{" "}
          <b className="text-success">SweetAlert2</b>,{" "}
          <b className="text-success">Boostrap 5</b> and{" "}
          <b className="text-success">Boxicons</b> technologies were used in
          this project.
        </p>
        <p>
          You can access the source code of the project from: <br />
          <a
            href="https://github.com/ycanga/chat-with-gpt"
            target="_blank"
            rel="noreferrer"
            className="text-success"
          >
            <box-icon name="github" type="logo" size="lg"></box-icon> 
          </a>
        </p>
        <p>
          Created by{" "} 
          <a
            href="https://instagram.com/_ycanga" target="_blank" rel="noreferrer" className="text-secondary" >
            Yunus Emre CANĞA
          </a>
        </p>
      </div>

      <ChatButton />
    </>
  );
}
