const electron = require("electron");
const url = require("url");
const path = require("path");
// const menuTemplate = require("./menuTemplates");
const { app, BrowserWindow, Menu } = electron;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
let mainWindow;
let editProjectsWindow;
let addClientWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/dashboard/mainWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindow.on("close", () => {
    app.quit();
  });
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//ALL VIEW TEMPLATE SWITCH

//ALL PROJECTS WINDOW
function createViewProjectsWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/projects/viewProjectsWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
}

ipcMain.on("openEditProjectWindow", (event, args) => {
  // console.log(args);
  let data = args;
  editProjectsWindow = new BrowserWindow({
    modal: true,
    parent: mainWindow,
    width: 1300,
    height: 768,
    toggleDevTools: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  editProjectsWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/projects/editProjectsWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
  editProjectsWindow.webContents.on("did-finish-load", () => {
    console.log("came here");
    setTimeout(() => {
      editProjectsWindow.webContents.send("projects:data", data);
    }, 1500);
  });
  // ipcMain.send("project:data", args);
});

//ALL CLIENTS WINDOW
function createViewClientsWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/clients/viewClientsWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
}

function createAddClientWindow() {
  addClientWindow = new BrowserWindow({
    height: 500,
    width: 700
  });
  addClientWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/views/clients/addClientWindow.html"),
      protocol: "file",
      slashes: true
    })
  );

  //   const epmtyMenu = Menu.buildFromTemplate(emptyMenuTemplate);
  //   //Insert Menu
  //   Menu.setApplicationMenu(epmtyMenu);
  //   addClientWindow.on("close", () => {
  //     const mainMenu = Menu.buildFromTemplate(menuTemplate);
  //     //Insert Menu
  //     Menu.setApplicationMenu(mainMenu);
  //   });
}

//MENU TEMPLATE
const emptyMenuTemplate = [];

const menuTemplate = [
  {
    label: "Dashboard"
  },
  {
    label: "Projects",
    submenu: [
      {
        label: "View Projects",
        click() {
          createViewProjectsWindow();
        }
      },
      {
        label: "Create Project"
      },
      {
        label: "Find Project"
      }
    ]
  },
  {
    label: "Tasks",
    submenu: [
      {
        label: "View Tasks"
      },
      {
        label: "Add Task"
      },
      {
        label: "Find Task"
      }
    ]
  },
  {
    label: "Clients",
    submenu: [
      {
        label: "View Clients",
        click() {
          createViewClientsWindow();
        }
      },
      {
        label: "Add Client",
        click() {
          createAddClientWindow();
        }
      },
      {
        label: "Find Client"
      }
    ]
  },
  {
    label: "Users",
    submenu: [
      {
        label: "View Users"
      },
      {
        label: "Add User"
      },
      {
        label: "Find User"
      }
    ]
  },
  {
    label: "Others",
    submenu: [
      {
        label: "Task State"
      },
      {
        label: "Priority State"
      },
      {
        label: "Label"
      }
    ]
  },
  {
    label: "Tools",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+Q",
        click() {
          app.quit();
        }
      },
      {
        label: "Developers Console",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  }
];
