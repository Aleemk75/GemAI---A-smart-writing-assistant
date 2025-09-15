import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx"
import { useContext, useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners";

const API = "https://gemai-a-smart-writing-assistant.onrender.com/api";
const ChatWindow = () => {

  const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats ,setNewChat} = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);
    console.log("message:", prompt, "threadId", currThreadId);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    }
    try {
      const response = await fetch(`${API}/chat`, options);
      const res = await response.json()
      setReply(res.reply)
      console.log(res);

    } catch (error) {
      console.log("error in getReply function:", error);

    }
    setLoading(false);
  }
  //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    
    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>GemAI <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv">
          <span className="userIcon" onClick={handleProfileClick}><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
        {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-caret-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
      <Chat />
      <ScaleLoader color="#fff" loading={loading} />
      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : ""}
          >

          </input>
          <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className="info">
          PrepAI can make mistakes. Check important info. See Cookie Preferences.
        </p>
      </div>
    </div>
  )
}

export default ChatWindow
