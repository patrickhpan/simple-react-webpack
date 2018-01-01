import React from 'react';
import { Route } from 'react-router-dom';
import keyify from 'util/keyify'

import App from 'containers/App';
import HelloWorld from 'containers/HelloWorld';
import About from 'containers/About';

const routes = [
    <Route exact path="/" component={HelloWorld} />,
    <Route path="/about" component={About} />
]

export default keyify(routes)