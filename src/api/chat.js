import Parse from "parse";

export async function getSelectedUsers(props) {
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

export async function clearSelectedUsers() {
  const parseQuery = new Parse.Query("ChatUsers");
  parseQuery.equalTo("owner", Parse.User.current());
  const queryResult = await parseQuery.findAll();
  queryResult.forEach((result) => result.destroy());
}

export async function checkUsersArray(usersArray) {
  if (usersArray === undefined || usersArray.length < 2) {
    return false;
  } else {
    return true;
  }
}

export async function chatRoomSetup(usersArray) {
  let chatRoomObject = null;
  try {
    const chatRoomParseQuery = new Parse.Query("ChatRoom");
    chatRoomParseQuery.containsAll("users", usersArray); // THIS HAS SOME PROBLEMS
    const chatRoomParseQueryResult = await chatRoomParseQuery.first();
    if (
      chatRoomParseQueryResult !== undefined &&
      chatRoomParseQueryResult !== null
    ) {
      chatRoomObject = chatRoomParseQueryResult;
      return chatRoomObject;
      //
    } else if (usersArray.length >= 2) {
      chatRoomObject = new Parse.Object("ChatRoom");
      chatRoomObject.set("users", usersArray); // POINTER OBJECTS HERE!
      await chatRoomObject.save();
      return chatRoomObject;
      //
    } else {
      console.log("Try to press back arrow and re-enter chat");
    }
  } catch (error) {
    console.log("ChatRoom Error", error);
  }
}
