# Sketchbook

Welcome to [Sketchbook](https://ahaku.github.io/sketchbook/), a progressive web app that allows you to create and store multiple drawings locally on your device. 
It is built on top of [Excalidraw](https://github.com/excalidraw/excalidraw), a simple yet powerful drawing tool.

## Features
- Create and edit sketches using Excalidraw
- Organize your sketches into folders
- Store your sketches locally using IndexedDB
- Use Sketchbook offline as a Progressive Web App (PWA)
- Export and import database

## How to use
1. Open [the app](https://ahaku.github.io/sketchbook/) in your browser
2. Create a new drawing or open an existing one from the sidebar on the left
3. Use the drawing tools in the top menu to create your masterpiece
4. Your sketches will automatically save one second after you stop drawing
5. To create a new folder, click the "New folder" button in the sidebar and give it a name

## Note on data storage
All of your drawings and folders are stored locally on your device using IndexedDB. 
This means that your data will not be synced across devices and will only be accessible on the device you created it on. 
You can use the export/import feature to transfer it to another device.

## Offline usage
To access your sketches offline, make sure to install Sketchbook as a PWA by clicking the "Install" button in your browser. This will allow you to use Sketchbook even when you don't have an internet connection.

### Built with
- [Excalidraw](https://github.com/excalidraw/excalidraw)
- [DexieDB](https://github.com/dexie/Dexie.js)
- [CRA](https://github.com/facebook/create-react-app)
