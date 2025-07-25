import { contextBridge } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 这里可以添加你需要的IPC通信方法
  // 例如：
  // sendMessage: (message: string) => ipcRenderer.send('message', message),
  // onResponse: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
  //   ipcRenderer.on('response', callback);
  //   return () => ipcRenderer.removeListener('response', callback);
  // },
  
  // 系统信息
  platform: process.platform,
});

// 预加载脚本中的所有Node.js API都可以使用
console.log('Electron preload script loaded');