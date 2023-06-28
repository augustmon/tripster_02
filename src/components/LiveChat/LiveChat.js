import React, { useState } from "react";
import "./../../App.css";
import Parse from "parse";
import { useParseQuery } from "@parse/react";

export default function LiveChat(props) {
  const sender = Parse.User.current();

  const [messageInput, setMessageInput] = useState("");

  // get messsages that are attached to this chatroom
  const messageQuery = new Parse.Query("Message");
  messageQuery.equalTo("chatRoomId", props.chatRoom);
  messageQuery.ascending("createdAt");
  messageQuery.includeAll();

  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(messageQuery, {
      enableLocalDatastore: true,
      enableLiveQuery: true,
    }); // Might delete everything except `results`

  async function sendMessage() {
    try {
      const messageText = messageInput;

      // CREATES a new Message object and save it
      let Message = new Parse.Object("Message");
      Message.set("text", messageText);
      Message.set("senderId", Parse.User.current());
      Message.set("chatRoomId", props.chatRoom); //
      Message.save();

      setMessageInput("");
    } catch (error) {
      alert(error);
    }
  }

  // Helper to format createdAt value on Message
  const formatDateToTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div>
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  // checks if sender is the current user or not
                  // and designates sent or received to displayed message
                  result.get("senderId").id === sender.id
                    ? "message-sent"
                    : "message-received"
                }
              >
                <div>{result.get("text")}</div>
                <div className="message-time">
                  {formatDateToTime(result.get("createdAt"))}
                </div>
                <div className="message-user">
                  {result.get("senderId").get("username")}
                </div>
              </div>
            ))}
        </div>
      )}

      <div>
        <input
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder={"Type message here....."}
          size="large"
          type={"message"}
        />
        <button className="send-message" onClick={sendMessage}></button>
      </div>
    </div>
  );
}
