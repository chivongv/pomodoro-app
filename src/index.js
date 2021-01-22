const { create } = require("domain");
const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    nodeIntegration: true,
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.on("ready", createWindow);
