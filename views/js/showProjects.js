const electron = require("electron");
const api_url = "http://localhost:5000";
function loadData() {
  let path = window.location.href;
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let project_id = urlParams.get("project_id");
  getProjectData(project_id);
  // console.log(urlParams.get("project_id"));
}

loadData();

console.log("came");

function getProjectData(project_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      loadProjectData(data);
    }
  };
  xhttp.open("GET", api_url + "/api/v1/projects/project/" + project_id, true);
  xhttp.send();
}

function loadProjectData(data) {
  let path = window.location.href;
  // console.log(path);
  let pathArray = path.split("/");
  pathArray[pathArray.length - 1] =
    "showProjectViewWindow.html?project_id=" + data.project_id;
  path = pathArray.join("/");
  // console.log(path);
  document.getElementById("project-cid").innerHTML = data.cid;
  document.getElementById("project-breadcumb").innerHTML = data.cid;
  document.getElementById("project-breadcumb").setAttribute("href", path);
  document.getElementById("project-name").innerHTML = data.project_name;
  document.getElementById("project-description").innerHTML =
    data.client_description;
}
