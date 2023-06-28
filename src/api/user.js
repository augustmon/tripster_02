import Parse from "parse";

// Create a new User
export async function createParseUser(bookingId, name, passwordConfirm) {
  // check if bookingId exists!
  try {
    const id = await queryBookingId(bookingId);
    if (id !== null) {
      console.log(id + " Booking key exist");
    }
  } catch (error) {
    alert("BOOKING KEY ERROR: " + error.message);
  }

  const bookingObject = await queryBookingObject(bookingId);

  let user = new Parse.User();
  user.set("bookingId", bookingObject);
  user.set("username", name);
  user.set("password", passwordConfirm);
  try {
    user = await user.save();
    if (user !== null) {
      alert(
        `New user created with success!  
        Username: ${user.get("username")}`
      );
      await Parse.User.logIn(name, passwordConfirm);
      return user;
    }
  } catch (error) {
    alert(`User Signup Error: ${error.message}`);
  }
}

async function queryBookingId(bookingIdInput) {
  let parseQuery = new Parse.Query("Booking");
  parseQuery.equalTo("key", bookingIdInput);
  let results = await parseQuery.find();

  let returnKey = results[0].get("key");
  return returnKey;
}

async function queryBookingObject(bookingIdInput) {
  let parseQuery = new Parse.Query("Booking");
  parseQuery.equalTo("key", bookingIdInput);
  let results = await parseQuery.find();

  let returnObject = results[0];
  return returnObject;
}
