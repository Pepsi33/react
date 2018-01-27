import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/lib/animate.css';
import registerServiceWorker from './registerServiceWorker';
import Routers from './routes/index';

ReactDOM.render(<Routers/>, document.getElementById('root'));
registerServiceWorker();
