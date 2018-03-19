import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");

  socket.emit("joinGame", window.location.pathname);

  //on game start submit:
  //change peoples state/page to role assignment - back end request to players DB ...how do we stagger the getData and the gameStart?
  socket.emit("gameStart", gameId);

  socket.on("getRoles", () => {
    //trigger function in store to get specific user's role from database and set it on state
    socket.emit("rolesAssigned");
  });

  socket.on("darkOver", () => {
    //dark data from users (who mafia kill/doctor save etc)
    socket.broadcast.emit("darkData", darkData);
  });

  socket.on("daytime", dataFromDark => {
    //change state/view to daytime view;
    //data we get back will look like { killed: Name } or { saved: Name }
    //share the data
    socket.emit("startDayTimerPreVotes");
  });

  socket.on("dark", () => {
    //change state/view to dark view
    socket.emit("startDarkTimer");
  });

  socket.on("getVotes", () => {
    //give voteData
    socket.broadcast.emit("voteData", voteData);
  });

  socket.on("dayVoteResults", dayVoteResults => {
    //tell them the results
    //this gets the string name of someone
    socket.emit("startDayTimerPostVotes");
  });

  socket.on("gameOver", winners => {
    //change state to game over which changes page
    //winners will either be Villagers or Mafia
  });
});

export default socket;
