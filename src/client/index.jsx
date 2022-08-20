import * as React from 'react';
import * as ReactDOM from 'react-dom';
import bridge from "@vkontakte/vk-bridge";
import { App } from '../App.jsx';
import '@vkontakte/vkui/dist/vkui.css';

// Init VK  Mini App
bridge.send("VKWebAppInit");

window.addEventListener('load', () => {
  ReactDOM.hydrate(<App />, document.getElementById('react-root'));
  if (process.env.NODE_ENV === "development") {
    import("./eruda.js").then(({ default: eruda }) => {}); //runtime download
  }
});
