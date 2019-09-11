const electron = require("electron");
const ipcRenderer = require("electron").ipcRenderer;
const {
  remote: { getCurrentWindow }
} = require("electron");
const api_url = "http://localhost:5000";

function loadData() {
  let path = window.location.href;
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let data = urlParams.get("data");
  //   console.log(data);
  //   getProjectData(project_id);
  // console.log(urlParams.get("project_id"));
}

// const webContents = getCurrentWindow().webContents;
// webContents.on("projects:data", (evt, args) => {
//   // evt.preventDefault();
//   console.log(args);
//   console.log(evt);
//   console.log("Working");
// });

// // loadData();
// ipcRenderer.on("project:data", function(event, args) {
//   // console.log(arg);
//   console.log("came here too");
//   document.getElementById("test").innerHTML = args;
// });

ipcRenderer.on("projects:data", (event, message) => {
  console.log(message); // Prints 'whoooooooh!'
});
