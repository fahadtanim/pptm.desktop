const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
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
  console.log(data);
  let path = window.location.href;
  // console.log(path);
  let pathArray = path.split("/");
  pathArray[pathArray.length - 1] =
    "showProjectViewWindow.html?project_id=" + data.project_id;
  path = pathArray.join("/");
  // console.log(path);
  document.getElementById("project-breadcumb").innerHTML = data.project_name;
  document.getElementById("project-breadcumb").setAttribute("href", path);
  //######### IDENTITY PRINT
  loadIdentity(data);

  //feature print
  loadFeature(data);
  //####### PROJECT DEADLINES PRINT #########
  loadDeadline(data);

  //ENROLLED USER PRINT
  getEnrolledUser(data.project_id);
}

function editProjectSpecification() {
  console.log("editProjectSpecification");
  ipcRenderer.send("openEditProjectWindow");
}

function loadIdentity(data) {
  document
    .getElementById("project-edit-btn")
    .addEventListener("click", editProjectSpecification);
  document.getElementById("project-cid").innerHTML = data.cid;
  document.getElementById("project-jid").innerHTML = data.jid;
  document.getElementById("project-redmine-jef").innerHTML =
    "#" + data.redmine_jef;
  document.getElementById("project-live-date").innerHTML = data.live_date;

  document.getElementById("project-client-pickup").innerHTML =
    data.client_pickup;
  document.getElementById("project-phase").innerHTML =
    data.current_phase.phase_name;

  document.getElementById("project-name").innerHTML = data.project_name;
  document.getElementById("project-description").innerHTML =
    data.project_description;
}

function loadFeature(data) {
  document.getElementById(
    "project-preprocessed"
  ).innerHTML = data.has_preprocessed ? "Yes" : "No";

  document.getElementById(
    "project-input-data-file-pattern"
  ).innerHTML = data.input_data_file_pattern_id
    ? data.input_data_file_pattern.data_file_pattern_name
    : "---------";

  document.getElementById(
    "project-working-data-file-pattern"
  ).innerHTML = data.working_data_file_pattern_id
    ? data.working_data_file_pattern.data_file_pattern_name
    : "---------";

  document.getElementById("project-checklist").innerHTML = data.has_checklist
    ? "Yes"
    : "No";

  document.getElementById("project-checkimage").innerHTML = data.has_checkimage
    ? "Yes"
    : "No";
  document.getElementById(
    "project-transaction"
  ).innerHTML = data.has_transaction ? "Yes" : "No";

  document.getElementById(
    "project-message-manager"
  ).innerHTML = data.has_message_manager ? "Yes" : "No";

  document.getElementById(
    "project-message-manager-type"
  ).innerHTML = data.message_manager_type_id
    ? data.message_manager_type.type_name
    : "---------";

  document.getElementById(
    "project-message-manager-text"
  ).innerHTML = data.message_manager_text_count
    ? data.message_manager_text_count
    : "0";

  document.getElementById(
    "project-message-manager-image"
  ).innerHTML = data.message_manager_image_count
    ? data.message_manager_image_count
    : "0";

  document.getElementById(
    "project-message-manager-total-content"
  ).innerHTML = data.total_message_manager_content_count
    ? data.total_message_manager_content_count
    : "0";
}

function loadDeadline(data) {
  let deadline_container = document.getElementById(
    "project-specification-deadlines-container"
  );
  let deadlines_length = data.project_deadlines.length;
  data.project_deadlines.sort((a, b) =>
    a.deadline_name > b.deadline_name
      ? 1
      : b.deadline_name > a.deadline_name
      ? -1
      : 0
  );

  console.log(data.project_deadlines);
  for (let i = 0; i < deadlines_length; i++) {
    // DEADLINE NAME PRINT
    let name_wrapper = document.createElement("div");
    name_wrapper.setAttribute("class", "col s3");
    let name_container = document.createElement("h6");
    name_container.setAttribute("class", "project-specification-title");
    let name = document.createTextNode(data.project_deadlines[i].deadline_name);
    name_container.appendChild(name);
    name_wrapper.appendChild(name_container);
    deadline_container.appendChild(name_wrapper);

    //DEADLINE DATE PRINT

    let date_wrapper = document.createElement("div");
    date_wrapper.setAttribute("class", "col s3");
    let date_container = document.createElement("p");
    date_container.setAttribute("class", "project-specification-content");
    let date = document.createTextNode(data.project_deadlines[i].deadline);
    date_container.appendChild(date);
    date_wrapper.appendChild(date_container);
    deadline_container.appendChild(date_wrapper);
  }
}

function getEnrolledUser(id) {
  var xhttp = new XMLHttpRequest();
  // console.log(id);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      loadEnrolledUser(data);
    }
  };
  xhttp.open(
    "GET",
    api_url + "/api/v1/project_enrolled_users/projects/id/" + id,
    true
  );
  xhttp.send();
}

function loadEnrolledUser(data) {
  console.log(data);
  let enrolledUserContainer = document.getElementById(
    "project-specification-enrolled-users-container"
  );

  let fullWidth = document.createElement("div");
  fullWidth.setAttribute("class", "col s12");

  let userLength = data.length;

  for (let i = 0; i < userLength; i++) {
    // DEADLINE NAME PRINT
    let enrolled_user_name_wrapper = document.createElement("div");
    enrolled_user_name_wrapper.setAttribute("class", "row");
    let enrolled_user_name_container = document.createElement("h6");
    enrolled_user_name_container.setAttribute(
      "class",
      "col s3 project-specification-title"
    );
    let name = document.createTextNode(data[i].user.fullname);
    enrolled_user_name_container.appendChild(name);
    enrolled_user_name_wrapper.appendChild(enrolled_user_name_container);
    // enrolledUserContainer.appendChild(enrolled_user_name_wrapper);

    //DEADLINE DATE PRINT

    let enrolled_user_role_container = document.createElement("p");
    enrolled_user_role_container.setAttribute(
      "class",
      "col s3 project-specification-content"
    );
    let role = document.createTextNode(data[i].project_role.project_role_name);
    enrolled_user_role_container.appendChild(role);
    enrolled_user_name_wrapper.appendChild(enrolled_user_role_container);
    fullWidth.appendChild(enrolled_user_name_wrapper);
  }
  enrolledUserContainer.appendChild(fullWidth);
}
