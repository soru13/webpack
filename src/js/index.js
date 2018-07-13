import '../css/estilos.css';
import { firstMessage,delayedMessage } from './message.js';
import platziImg from '../img/platzi.png';
import videoPlatzi from '../video/que-es-core.mp4';
import data from './teachers.json';
import renderToDOM from './render-to-dom.js';
import React from 'react';
import { render } from 'react-dom';
import Teachers from './components/teachers.js';

render(<Teachers data={data.teachers}/>, document.getElementById('container'))

// data.teachers.forEach((teacher)=>{
// 	const element = document.createElement('li');
// 	element.textContent = teacher.name;
// 	renderToDOM(element);
// });


// delayedMessage();
// const video = document.createElement('video');
// video.setAttribute('src',videoPlatzi);
// video.setAttribute('width',480);
// video.setAttribute('autoplay',true);
// video.setAttribute('controls',true);
// document.body.append(video);

// const img = document.createElement('img');
// img.setAttribute('src',platziImg);
// img.setAttribute('width',50);
// img.setAttribute('height',50);
// document.body.append(img);