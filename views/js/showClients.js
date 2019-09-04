const electron = require("electron");
const api_url = "http://localhost:5000";
function loadData() {
  let path = window.location.href;
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let client_id = urlParams.get("client_id");
  getClientData(client_id);
  // console.log(urlParams.get("client_id"));
}

loadData();

function getClientData(client_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      loadClientData(data);
    }
  };
  xhttp.open("GET", api_url + "/api/v1/clients/" + client_id, true);
  xhttp.send();
}

function loadClientData(data) {
  let path = window.location.href;
  // console.log(path);
  let pathArray = path.split("/");
  pathArray[pathArray.length - 1] =
    "showClientViewWindow.html?client_id=" + data.client_id;
  path = pathArray.join("/");
  // console.log(path);
  document.getElementById("client-cid").innerHTML = data.cid;
  document.getElementById("client-breadcumb").innerHTML = data.cid;
  document.getElementById("client-breadcumb").setAttribute("href", path);
  document.getElementById("client-name").innerHTML = data.client_name;
  document.getElementById("client-description").innerHTML =
    data.client_description;
}
