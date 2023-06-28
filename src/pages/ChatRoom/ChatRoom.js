import { React, useState } from "react";
import Parse from "parse";

import "./../../App.css";
import "./ChatRoom.css";

// COMPONENTS
import ChatSetup from "../../components/ChatSetup/ChatSetup";
import PageTitle from "../../components/PageTitle/PageTitle";
import BackArrow from "../../components/BackArrow/BackArrow";

export default function ChatRoom(props) {
  // console.log("chatUsers", props.chatUsers);
  const [chatRoom, setChatRoom] = useState(null);

  // IMPORT FROM API
  function getOtherUsers() {
    const usersInChat = props.chatUsers;
    let usersOtherThanCurrent = [];
    usersInChat.forEach((user) => {
      if (user.id === Parse.User.current().id || user === "empty") {
        return;
      } else if (user.id !== undefined) {
        usersOtherThanCurrent.push(user.get("username"));
      }
    });

    return usersOtherThanCurrent;
  }
  const usersOtherThanCurrent = getOtherUsers();

  return (
    <div>
      <header>
        <div className="arrow">
          <BackArrow to="/activechats" onClick={() => props.setChatUsers([])} />
        </div>

        <div>
          <div className="chat-room-title">
            {chatRoom !== null && (
              <PageTitle
                title={
                  chatRoom.get("chatTitle") !== undefined
                    ? chatRoom.get("chatTitle")
                    : usersOtherThanCurrent
                }
              />
            )}
          </div>
        </div>
      </header>
      <ChatSetup
        chatUsers={props.chatUsers}
        setChatRoom={setChatRoom}
        chatRoom={chatRoom}
      />
    </div>
  );
}
