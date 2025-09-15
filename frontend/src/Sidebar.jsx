import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import { v1 as uuidv1 } from "uuid"

const API = "https://gemai-a-smart-writing-assistant.onrender.com/api";
const Sidebar = () => {
  const { allThreads, setALLThreads, setNewChat, currThreadId, setPrompt, setReply, setCurrThreadId, prevChats, setPrevChats } = useContext(MyContext);
  const [isLoadingThread, setIsLoadingThread] = useState(false);

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${API}/thread`)
      const res = await response.json();
      const filteredData = res.map(thread => (
        {
          threadId: thread.threadId,
          title: thread.title
        }
      ))

      // console.log(filteredData);
      setALLThreads(filteredData)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  //create a new chat button
  const createNewChat = () => {
    setNewChat(true)
    setPrompt("");
    setReply([]);
    setCurrThreadId(uuidv1());
    setPrevChats([])
  }

  // get thread by the id / to click on the title
  const getThread = async (threadId) => {
    setIsLoadingThread(true);
    setCurrThreadId(threadId);
    try {
      const response = await fetch(`${API}/thread/${threadId}`);
      const res = await response.json();
      console.log(res);

      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      setIsLoadingThread(false);
    } catch (error) {
      console.log("error in getThread function:", error);
    }
  }

  //delete thread by threadId(uuid)
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`${API}/thread/${threadId}`, { method: "DELETE" })
      const res = await response.json();
      console.log(res);

      //updated thread re-render
      setALLThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId === currThreadId){
        createNewChat();
      }
    } catch (error) {
      console.log("error in deleteThread function:", error);
    }
  }
  return (
    <section className="sidebar">
      {/* new chat btn */}
      <button onClick={createNewChat}>
        <img src="/gemAI.png" alt="logo" className="logo" />
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      {/* history */}
      <ul className="history">

        {
          allThreads?.map((thread, idx) => (
            <li onClick={() => getThread(thread.threadId)} key={idx}
            className={thread.threadId === currThreadId? "highlighted":""}
            >

              {thread.title}
              <i className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation(); //stop event bubbling
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          ))
        }
      </ul>


      {/* sign app owner */}
      <div className="sign">
        <img src="/gemAI.png" alt="logo" className="logo2" />
        <p> By Aleemkhan &hearts;</p>
      </div>
    </section>
  )
}

export default Sidebar
