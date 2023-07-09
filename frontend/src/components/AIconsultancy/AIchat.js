import React, { useState } from "react";
import "./aichat.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function AIChat() {
  const [answer, setanswer] = useState();
  const [question, setquestion] = useState();
  const [wait, setwait] = useState(false);
  const getAnswer = async () => {
    setwait(true);
    await axios
      .post("http://localhost:4000/api/v1/medical/chatbot", {
        input: question,
      })
      .then((res) => {
        setwait(false);
        setanswer(res.data.result);
      })
      .catch((error) => {
        setwait(false);
        alert("openAI server busy");
        console.log(error);
      });
  };
  return (
    <>
      {wait ? (
        <div style={{ height: "60vh", display: "flex" }}>
          <div
            style={{
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      ) : (
        <div class="chatbox">
          <p>{answer}</p>
          <input
            type="text"
            value={question}
            class="chatbotQuestion"
            placeholder="Your question..."
            onChange={(e) => {
              setquestion(e.target.value);
            }}
          />
          <button onClick={getAnswer}>Get Answer</button>
        </div>
      )}
    </>
  );
}

export default AIChat;
