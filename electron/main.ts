import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取__dirname，因为在ESM模式下没有直接的__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
})