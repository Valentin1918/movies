import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import './MovieLibrary/styles/index.css';
import createApp from './MovieLibrary';
import registerServiceWorker from './registerServiceWorker';
import registerInternalSW from './registerInternalSW';

const root = document.getElementById('root');
const App = createApp();

Modal.setAppElement(root);
render(<App />, root);
registerServiceWorker();
registerInternalSW();
