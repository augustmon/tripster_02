import React, { useEffect, useState } from "react";
import "./../../App.css";
import Parse from "parse";
import { chatRoomSetup, checkUsersArray } from "../../api/chat";

//COMPONENTS
import LiveChat from "../LiveChat/LiveChat";

export default function ChatSetup(props) {
  const [sender, setSender] = useState(Parse.User.current());

  const [usersArray, setUsersArray] = useState(props.chatUsers);
  // console.log("props.chatUsers", props.chatUsers);

  useEffect(() => {
    //// IMPORT THIS FROM API
    async function getSelectedUsers() {
      // Saving chatUsers to temp database
      if (props.chatUsers.length >= 2) {
        const parseQuery = new Parse.Query("ChatUsers");
        parseQuery.equalTo("owner", Parse.User.current());
        const queryResult = await parseQuery.first();

        if (queryResult === undefined) {
          const newSelectedUsers = new Parse.Object("ChatUsers");
          newSelectedUsers.set("selectedUsers", props.chatUsers);
          newSelectedUsers.set("owner", Parse.User.current());
          await newSelectedUsers.save();
        } else {
          queryResult.set("selectedUsers", props.chatUsers);
          await queryResult.save();
        }
      }

      // Retrieving chatUsers from temp database
      const parseQuery = new Parse.Query("ChatUsers");
      parseQuery.equalTo("owner", Parse.User.current());
      const selectedUsers = await parseQuery
        .first()
        .then((result) => result.get("selectedUsers"));
      // console.log("selectedUsersQuery", selectedUsers);
      return selectedUsers;
    }

    getSelectedUsers().then((result) => setUsersArray(result));
  }, []);

  useEffect(() => {
    if (props.chatRoom === null || props.chatRoom === undefined) {
      chatRoomSetup(usersArray).then((result) => {
        // console.log("chatroomSetup result", result);
        props.setChatRoom(result);
      });
    }
    checkUsersArray(usersArray);
  }, [usersArray]);

  // console.log("usersArray", usersArray);

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
