const electron = require("electron");
const ipcRenderer = require("electron").ipcRenderer;
const {
  remote: { getCurrentWindow }
} = require("electron");
const api_url = "http://localhost:5000";

ipcRenderer.on("projects:data", (event, message) => {
  console.log(message); // Prints 'whoooooooh!'
});
