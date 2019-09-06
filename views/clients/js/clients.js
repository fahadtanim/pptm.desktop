const electron = require("electron");
const api_url = "http://localhost:5000";
const { ipcRenderer } = electron;

/// #################  MAIN CLIENT WINDOW   #############################

function loadDoc(currentPage) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      loadData(data, currentPage);
    }
  };
  xhttp.open("GET", api_url + "/api/v1/clients/page/" + currentPage, true);
  xhttp.send();
}

loadDoc(1);

function loadData(data, currentPage) {
  let client = data.rows;
  let total_page =
    data.count % 10 == 0
      ? data.count / 10
      : (data.count + (10 - (data.count % 10))) / 10;
  console.log(data);

  document.getElementById("data-input-field").innerHTML = "";
  document.getElementById("data-result").innerHTML = "";
  if (client != null && client != undefined && client.length > 0) {
    for (let i = 0; i < client.length; i++) {
      //cid
      let trElement = document.createElement("tr");
      let tdElement = document.createElement("td");
      let txt = document.createTextNode(client[i].cid);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      //clientName
      tdElement = document.createElement("td");
      txt = document.createTextNode(client[i].client_name);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      //client_description
      tdElement = document.createElement("td");
      txt = document.createTextNode(client[i].client_description);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      trElement.setAttribute(
        "onClick",
        "showClient(" + client[i].client_id + ")"
      );
      let tableBody = document.getElementById("data-input-field");
      tableBody.appendChild(trElement);
    }

    document.getElementById("total_client_page_count").innerHTML =
      "total page : " + total_page;
    document.getElementById("go_to_page").setAttribute("max", total_page);

    document.getElementById("go_to_page").value = currentPage;
  } else {
    document.getElementById("data-result").innerHTML =
      "Sorry, No Clients To Show";
  }
}

function showClient(id) {
  let path = window.location.href;
  // console.log(path);
  let pathArray = path.split("/");
  pathArray[pathArray.length - 1] = "showClientViewWindow.html?client_id=" + id;
  path = pathArray.join("/");
  // console.log(path);
  window.location.href = path;
  // console.log(path);
}

document
  .getElementById("search-client-field")
  .addEventListener("keydown", () => {
    let data = document.getElementById("search-client-field").value;
    SearchClient(1, data);
  });

function SearchClient(page, value) {
  console.log(value);
  console.log(page);
  if (page != "" && value != "") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        loadSerchData(this.response, page);
      }
    };
    xhttp.open(
      "GET",
      api_url + "/api/v1/clients/page/search/" + value + "/" + page,
      true
    );
    xhttp.send();
  }
}

function loadSerchData(data, currentPage) {
  data = JSON.parse(data);
  let client = data.rows;
  let total_page =
    data.count % 10 == 0
      ? data.count / 10
      : (data.count + (10 - (data.count % 10))) / 10;
  console.log(test);

  document.getElementById("data-input-field").innerHTML = "";
  document.getElementById("data-result").innerHTML = "";
  if (client != null && client != undefined && client.length > 0) {
    for (let i = 0; i < client.length; i++) {
      //cid
      let trElement = document.createElement("tr");
      let tdElement = document.createElement("td");
      let txt = document.createTextNode(client[i].cid);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      //clientName
      tdElement = document.createElement("td");
      txt = document.createTextNode(client[i].client_name);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      //client_description
      tdElement = document.createElement("td");
      txt = document.createTextNode(client[i].client_description);
      tdElement.appendChild(txt);
      trElement.appendChild(tdElement);
      trElement.setAttribute("onClick", "showClient(" + client[i].id + ")");
      let tableBody = document.getElementById("data-input-field");
      tableBody.appendChild(trElement);
    }

    document.getElementById("total_client_page_count").innerHTML =
      "total page : " + total_page;
    if (document.getElementById("client_page_btn")) {
      document.getElementById("go_to_page").setAttribute("max", total_page);
      document
        .getElementById("client_page_btn")
        .setAttribute("id", "client_search_page_btn");
    }
    document.getElementById("go_to_page").value = currentPage;
  } else {
    document.getElementById("data-result").innerHTML =
      "Sorry, No Clients To Show";
    if (document.getElementById("client_page_btn")) {
      document.getElementById("go_to_page").setAttribute("max", 1);
      document
        .getElementById("client_page_btn")
        .setAttribute("id", "client_search_page_btn");
    }
    document.getElementById("total_client_page_count").innerHTML =
      "total page : " + 1;
    document.getElementById("go_to_page").setAttribute("max", 1);
    document.getElementById("go_to_page").value = currentPage;
  }
}

document.getElementById("client_page_btn").addEventListener("click", () => {
  const page = document.getElementById("go_to_page").value;
  console.log(page);
  loadDoc(page);
});

function addClientSearchBtn() {
  document
    .getElementById("client_search_page_btn")
    .addEventListener("click", () => {
      const page = document.getElementById("go_to_page").value;
      const value = document.getElementById("search-client-field").value;
      console.log(page);
      console.log(value);
      SearchClient(page, value);
    });
}

/// ########  SINGLE CLIENT WINDOW ###############################################
