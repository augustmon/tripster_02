import React, { useEffect, useState } from "react";
import "./../../App.css";
import Parse from "parse";
import {
  chatRoomSetup,
  checkUsersArray,
  getSelectedUsers,
} from "../../api/chat";

//COMPONENTS
import LiveChat from "../LiveChat/LiveChat";

export default function ChatSetup(props) {
  const sender = Parse.User.current();

  const [usersArray, setUsersArray] = useState(props.chatUsers);

  useEffect(() => {
    getSelectedUsers(props).then((result) => setUsersArray(result));
  }, []);

  useEffect(() => {
    if (props.chatRoom === null || props.chatRoom === undefined) {
      chatRoomSetup(usersArray).then((result) => {
        props.setChatRoom(result);
      });
    }
    checkUsersArray(usersArray);
  }, [usersArray]);

  return (
    <div>
      {props.chatRoom === null && <h1> chat setup ...</h1>}

      {props.chatRoom !== undefined &&
        props.chatRoom !== null &&
        usersArray.length >= 2 &&
        sender.id !== undefined && (
          <div>
            <LiveChat chatRoom={props.chatRoom} sender={sender} />
          </div>
        )}
    </div>
  );
}
