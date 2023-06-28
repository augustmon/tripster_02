import Parse from "parse";

export async function clearSelectedUsers() {
  const parseQuery = new Parse.Query("ChatUsers");
  parseQuery.equalTo("owner", Parse.User.current());
  const queryResult = await parseQuery.findAll();
  // console.log("query result", queryResult);
  queryResult.forEach((result) => result.destroy());
}

export async function checkUsersArray(usersArray) {
  if (usersArray === undefined || usersArray.length < 2) {
    // console.log("Trying to fetch users");
    return false;
  } else {
    // console.log("Users are present");
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
      // console.log("Entering Chat Room:", chatRoomParseQueryResult.id);
      chatRoomObject = chatRoomParseQueryResult;
      return chatRoomObject;
      //
    } else if (usersArray.length >= 2) {
      // console.log("CREATING NEW CHAT ROOM FOR", usersArray);
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
